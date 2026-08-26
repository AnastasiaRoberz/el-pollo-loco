import { BossChicken } from "./boss-chicken.class.js";
import { Character } from "./character.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
	static canvas;
	static idCounter = 0;
	static character;
	ctx;
	bgLayers = [];
	clouds = [];
	throwableObjects = [];
	cameraPos;
	level;
	gameOver = false;
	onGameOver;
	collectedBottles = 0;
	collectedCoins = 0;

	constructor(canvas, onGameOver) {
		World.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		World.character = new Character();
		this.level = new Level(3, World.character);
		this.bgLayers = this.level.bgLayers;
		this.onGameOver = onGameOver;
		this.draw();
		this.run();
		Keyboard.init();
	}

	draw() {
		const maxcameraPos = -(Level.maxWidth - World.canvas.width);
		this.ctx.clearRect(0, 0, World.canvas.width, World.canvas.height);

		this.cameraPos = -World.character.xPos + World.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < maxcameraPos) this.cameraPos = maxcameraPos;
		this.ctx.translate(this.cameraPos, 0);

		this.addObjectsToMap(this.bgLayers);
		this.addObjectsToMap(this.level.clouds);
		World.character.draw(this.ctx);
		this.level.bossChicken.draw(this.ctx);
		// World.character.drawFrame(this.ctx);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.colObjects.bottles);

		this.addObjectsToMap(this.level.colObjects.coins);
		this.ctx.translate(-this.cameraPos, 0);

		this.level.bars.healthBar.draw(this.ctx);
		this.level.bars.coinBar.draw(this.ctx);
		this.level.bars.bottleBar.draw(this.ctx);
		if (this.level.bossChicken.isTriggered) {
			this.level.bars.healthEndboss.draw(this.ctx);
		}

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
			// object.drawFrame(this.ctx);
		});
	}

	run() {
		IntervalHub.startInterval(
			"main-interval",
			() => {
				this.collectItems();
				this.collectCoins();
				this.checkCollisions();
				this.checkThrowObjects();
				this.hitBossChicken();
				this.checkBottleCollision();
				this.checkGameEnd();
			},
			200,
		);
	}

	collectItems() {
		this.level.colObjects.bottles.forEach((bottle) => {
			if (World.character.isColliding(bottle)) {
				this.collectedBottles++;
				const index = this.level.colObjects.bottles.indexOf(bottle);
				this.level.colObjects.bottles.splice(index, 1);
				this.level.bars.bottleBar.setPercentage(this.collectedBottles * 20);
			}
		});
	}

	collectCoins() {
		this.level.colObjects.coins.forEach((coin) => {
			if (World.character.isColliding(coin)) {
				this.collectedCoins++;
				const index = this.level.colObjects.coins.indexOf(coin);
				this.level.colObjects.coins.splice(index, 1);
				this.level.bars.coinBar.setPercentage(this.collectedCoins * 20);
			}
		});
	}

	checkBottleCollision() {
		this.throwableObjects.forEach((bottle) => {
			if (!this.level.bossChicken.isDead() && bottle.isColliding(this.level.bossChicken) && !bottle.hasHit) {
				bottle.splash();
				if (!this.level.bossChicken.isHurt()) {
					this.level.bossChicken.isHit(50);
					this.level.bars.healthEndboss.setPercentage(this.level.bossChicken.energy);
				}
				setTimeout(() => {
					const id = this.throwableObjects.indexOf(bottle);
					this.throwableObjects.splice(id, 1);
				}, 1000);
			}
		});
	}

	hitBossChicken() {
		if (this.level.bossChicken.isColliding(World.character)) {
			if (!World.character.isHurt()) {
				World.character.isHit(5);
				this.level.bars.healthBar.setPercentage(World.character.energy);
			}
		}
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (World.character.isColliding(enemy) && !enemy.isDead()) {
				const isFalling = World.character.speedY < 0;
				const isAboveEnemy = World.character.yPos < enemy.yPos + 20;

				if (World.character.isAboveGround() && isFalling && isAboveEnemy) {
					if (!(enemy instanceof BossChicken)) enemy.die();
					setTimeout(() => {
						const currentIndex = this.level.enemies.indexOf(enemy);
						this.level.enemies.splice(currentIndex, 1);
					}, 1000);
					World.character.jump(World.character.height * 0.03);
				} else {
					if (!World.character.isHurt()) {
						World.character.isHit(30);
						this.level.bars.healthBar.setPercentage(World.character.energy);
					}
				}
			}
		});
	}

	checkThrowObjects() {
		if (Keyboard.KEY_F && this.collectedBottles > 0) {
			const xPos = World.character.flipDirection ? World.character.xPos : World.character.xPos + World.character.width;
			const yPos = World.character.yPos + 50;
			const bottle = new ThrowableObject(xPos, yPos, World.character.flipDirection);
			this.throwableObjects.push(bottle);
			this.collectedBottles--;
			this.level.bars.bottleBar.setPercentage(this.collectedBottles * 20);
			Keyboard.KEY_F = false;
		}
	}

	checkGameEnd() {
		if (World.character.isDead() && !this.gameOver) {
			setTimeout(() => {
				this.gameOver = true;
				// this.onGameOver("lost");
				IntervalHub.stopAllIntervals();
			}, 5000);
		} else if (this.level.bossChicken.isDead() && !this.gameOver) {
			setTimeout(() => {
				this.gameOver = true;
				// this.onGameOver("won");
				IntervalHub.stopAllIntervals();
			}, 3000);
		}
	}
}
