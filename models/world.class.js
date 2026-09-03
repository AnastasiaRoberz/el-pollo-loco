import { Character } from "./character.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { LevelHub } from "../hubs/level-hub.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
	static canvas;
	static character;
	ctx;
	throwableObjects = [];
	cameraPos;
	maxCameraPos;
	level;
	gameOver = false;
	onGameOver;
	collectedBottles = 0;
	collectedCoins = 0;
	lastThrow = 0;
	throwCooldown = 1000;

	constructor(canvas, difficulty) {
		World.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		World.character = new Character();
		this.level = new Level(LevelHub[`LEVEL_${difficulty}`]);
		// this.onGameOver = onGameOver;
		Keyboard.init();
		this.maxCameraPos = -(Level.maxWidth - World.canvas.width);
		this.draw();
		this.run();
	}

	draw() {
		this.ctx.clearRect(0, 0, World.canvas.width, World.canvas.height);
		this.cameraPos = -World.character.xPos + World.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < this.maxCameraPos) this.cameraPos = this.maxCameraPos;

		this.ctx.translate(this.cameraPos, 0);
		this.drawObjects();
		this.drawFrames();
		// this.drawOffsetFrames();
		this.ctx.translate(-this.cameraPos, 0);
		this.drawStatusbars();
		requestAnimationFrame(() => this.draw());
	}

	drawObjects() {
		this.addObjectsToMap(this.level.bgLayers);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.colObjects.bottles);
		this.addObjectsToMap(this.level.colObjects.coins);
		World.character.draw(this.ctx);
		this.level.bossChicken.draw(this.ctx);
	}

	drawFrames() {
		World.character.drawFrame(this.ctx);
		this.level.bossChicken.drawFrame(this.ctx);
		this.level.enemies.forEach((enemy) => enemy.drawFrame(this.ctx));
		this.level.colObjects.bottles.forEach((bottle) => bottle.drawFrame(this.ctx));
		this.level.colObjects.coins.forEach((coin) => coin.drawFrame(this.ctx));
	}

	drawOffsetFrames() {
		World.character.setRealFrame();
		World.character.drawOffsetFrame(this.ctx);
		this.level.bossChicken.setRealFrame();
		this.level.bossChicken.drawOffsetFrame(this.ctx);
		this.level.enemies.forEach((enemy) => enemy.drawOffsetFrame(this.ctx));
		this.level.colObjects.bottles.forEach((bottle) => bottle.drawOffsetFrame(this.ctx));
		this.level.colObjects.coins.forEach((coin) => coin.drawOffsetFrame(this.ctx));
	}

	drawStatusbars() {
		this.level.bars.healthBar.draw(this.ctx);
		this.level.bars.coinBar.draw(this.ctx);
		this.level.bars.bottleBar.draw(this.ctx);
		if (this.level.bossChicken.isTriggered) {
			this.level.bars.healthEndboss.draw(this.ctx);
		}
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => object.draw(this.ctx));
	}

	run() {
		IntervalHub.startInterval(() => {
			this.setRealFrames();
			this.checkCollisions();
			this.collectItems();
			this.throwObjects();
			this.checkGameEnd();
		}, 1000 / 60);
	}

	setRealFrames() {
		World.character.setRealFrame();
		this.level.bossChicken.setRealFrame();
		this.level.enemies.forEach((enemy) => enemy.setRealFrame());
		this.level.colObjects.bottles.forEach((bottle) => bottle.setRealFrame());
		this.level.colObjects.coins.forEach((coin) => coin.setRealFrame());
	}

	checkCollisions() {
		this.collisionBossCharacter();
		this.level.enemies.forEach((enemy) => {
			this.collisionEnemyCharacter(enemy);
			this.collisionEnemyBottle(enemy);
		});
		this.throwableObjects.forEach((bottle) => {
			this.collisionBossBottle(bottle);
			this.removeBottle(bottle);
		});
	}

	collisionEnemyCharacter(enemy) {
		if (World.character.isColliding(enemy) && !enemy.isDead()) {
			const isFalling = World.character.speedY < 0;
			const isAboveEnemy = World.character.ryPos < enemy.ryPos;

			if (World.character.isAboveGround() && isFalling && isAboveEnemy) {
				enemy.die();
				setTimeout(() => {
					const currentIndex = this.level.enemies.indexOf(enemy);
					this.level.enemies.splice(currentIndex, 1);
				}, 1000);
				World.character.jump(World.character.height * 0.03);
			} else {
				if (!World.character.isHurt()) {
					World.character.isHit(this.level.config.damage);
					this.level.bars.healthBar.setPercentage(World.character.energy);
				}
			}
		}
	}

	collisionEnemyBottle(enemy) {
		this.throwableObjects.forEach((bottle) => {
			if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.hasHit) {
				enemy.die();
				bottle.hasHit = true;
			}
		});
	}

	collisionBossCharacter() {
		if (this.level.bossChicken.isColliding(World.character) && !this.level.bossChicken.isDead()) {
			if (!World.character.isHurt()) {
				World.character.isHit();
				this.level.bars.healthBar.setPercentage(World.character.energy);
			}
		}
	}

	collisionBossBottle(bottle) {
		if (!this.level.bossChicken.isDead() && bottle.isColliding(this.level.bossChicken) && !bottle.hasHit) {
			bottle.hasHit = true;
			if (!this.level.bossChicken.isHurt()) {
				this.level.bossChicken.isHit(this.level.config.bottleDamage);
				this.level.bars.healthEndboss.setPercentage(this.level.bossChicken.energy);
			}
		}
	}

	removeBottle(bottle) {
		if (bottle.bottleHitGround() || bottle.hasHit) {
			setTimeout(() => {
				const bottleId = this.throwableObjects.indexOf(bottle);
				this.throwableObjects.splice(bottleId, 1);
			}, 300);
		}
	}

	collectItems() {
		this.level.colObjects.bottles.forEach((bottle) => this.collectBottles(bottle));
		this.level.colObjects.coins.forEach((coin) => this.collectCoins(coin));
	}

	collectBottles(bottle) {
		if (World.character.isColliding(bottle)) {
			this.collectedBottles++;
			const index = this.level.colObjects.bottles.indexOf(bottle);
			this.level.colObjects.bottles.splice(index, 1);
			this.level.bars.bottleBar.setPercentage(this.collectedBottles);
		}
	}

	collectCoins(coin) {
		if (World.character.isColliding(coin)) {
			this.collectedCoins++;
			const index = this.level.colObjects.coins.indexOf(coin);
			this.level.colObjects.coins.splice(index, 1);
			this.level.bars.coinBar.setPercentage(this.collectedCoins);
			// if (this.collectedCoins >= this.level.config.coinsForBottle) {
			// 	this.collectedCoins -= this.level.config.coinsForBottle;
			// 	this.collectedBottles++;
			// 	this.level.bars.coinBar.setPercentage(this.collectedCoins);
			// 	this.level.bars.bottleBar.setPercentage(this.collectBottles);
			// }
		}
	}

	throwObjects() {
		if (Keyboard.KEY_F && this.collectedBottles > 0 && Date.now() - this.lastThrow > this.throwCooldown) {
			const xPos = World.character.flipDirection ? World.character.xPos : World.character.xPos + World.character.width;
			const yPos = World.character.yPos + 50;
			const bottle = new ThrowableObject(xPos, yPos, World.character.flipDirection);
			this.throwableObjects.push(bottle);
			this.collectedBottles--;
			this.level.bars.bottleBar.setPercentage(this.collectedBottles);
			this.lastThrow = Date.now();
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
