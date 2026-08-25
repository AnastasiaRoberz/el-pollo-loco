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
	ctx;
	character;
	bgLayers = [];
	clouds = [];
	throwableObjects = [];
	cameraPos;
	level;
	gameOver = false;
	gameOverImg;
	collectedBottles = 0;

	constructor(canvas) {
		World.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.level = new Level(3);
		this.gameOverImg = new Image();
		this.gameOverImg.src = ImageHub.INTRO_OUTRO_SCREENS.lost[5];
		this.createObjects();
		this.draw();
		this.run();
		Keyboard.init();
	}

	createObjects() {
		this.character = new Character();
		this.bgLayers = this.level.bgLayers;
	}

	draw() {
		const maxcameraPos = -(Level.maxWidth - World.canvas.width);
		this.ctx.clearRect(0, 0, World.canvas.width, World.canvas.height);

		this.cameraPos = -this.character.xPos + this.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < maxcameraPos) this.cameraPos = maxcameraPos;
		this.ctx.translate(this.cameraPos, 0);

		this.addObjectsToMap(this.bgLayers);
		this.addObjectsToMap(this.level.clouds);
		this.character.draw(this.ctx);
		// this.character.drawFrame(this.ctx);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.colObjects.bottles);
		// this.addObjectsToMap(this.level.colObjects[coins]);
		this.ctx.translate(-this.cameraPos, 0);

		this.level.bars.healthBar.draw(this.ctx);
		this.level.bars.coinBar.draw(this.ctx);
		this.level.bars.bottleBar.draw(this.ctx);

		if (this.gameOver) {
			const imgWidth = World.canvas.width * 0.7;
			const imgHeight = imgWidth * 0.58;
			const imgX = (World.canvas.width - imgWidth) / 2;
			const imgY = (World.canvas.height - imgHeight) / 2;
			this.ctx.drawImage(this.gameOverImg, imgX, imgY, imgWidth, imgHeight);
		}

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
			// if (object instanceof Chicken) object.drawFrame(this.ctx);
		});
	}

	run() {
		IntervalHub.startInterval(
			"main-interval",
			() => {
				this.collectItems();
				this.checkCollisions();
				this.checkThrowObjects();
				this.checkGameEnd();
			},
			200,
		);
	}

	collectItems() {
		this.level.colObjects.bottles.forEach((bottle) => {
			if (this.character.isColliding(bottle)) {
				this.collectedBottles++;
				const index = this.level.colObjects.bottles.indexOf(bottle);
				this.level.colObjects.bottles.splice(index, 1);
				this.level.bars.bottleBar.setPercentage(this.collectedBottles * 20);
			}
		});
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy) && !enemy.isDead()) {
				const isFalling = this.character.speedY < 0;
				const isAboveEnemy = this.character.yPos < enemy.yPos + 20;

				if (this.character.isAboveGround() && isFalling && isAboveEnemy) {
					if (!(enemy instanceof BossChicken)) enemy.die();
					setTimeout(() => {
						const currentIndex = this.level.enemies.indexOf(enemy);
						this.level.enemies.splice(currentIndex, 1);
					}, 1000);
					this.character.jump(this.character.height * 0.03);
				} else {
					if (!this.character.isHurt()) {
						this.character.isHit(5);
						this.level.bars.healthBar.setPercentage(this.character.energy);
					}
				}
			}
		});
	}

	checkThrowObjects() {
		if (Keyboard.KEY_F && this.collectedBottles > 0) {
			const xPos = this.character.flipDirection ? this.character.xPos : this.character.xPos + this.character.width;
			const yPos = this.character.yPos * 1.8;

			this.throwableObjects.push(new ThrowableObject(xPos, yPos, this.character.flipDirection));
			this.collectedBottles--;
			this.level.bars.bottleBar.setPercentage(this.collectedBottles * 20);
			Keyboard.KEY_F = false;
		}
	}

	checkGameEnd() {
		if (this.character.isDead() && !this.gameOver) {
			setTimeout(() => {
				this.gameOver = true;
				IntervalHub.stopAllIntervals();
			}, 1500);
		}
	}

	static resetIdCounter() {
		World.idCounter = 0;
	}
}
