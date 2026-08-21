import { BossChicken } from "./boss-chicken.class.js";
import { Character } from "./character.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
	canvas;
	ctx;
	character;
	enemies = [];
	bgLayers = [];
	clouds = [];
	throwableObjects = [];
	cameraPos;
	level;
	maxWidth;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.level = new Level(this.canvas, 2, 5);
		this.maxWidth = this.level.maxWidth;
		this.createObjects();
		this.draw();
		this.run();
	}

	createObjects() {
		this.character = new Character(this.canvas.height, this.maxWidth);
		this.bgLayers = this.level.bgLayers;
		this.clouds = this.level.clouds;
		this.enemies = this.level.enemies;
	}

	draw() {
		const maxcameraPos = -(this.maxWidth - this.canvas.width);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.cameraPos = -this.character.xPos + this.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < maxcameraPos) this.cameraPos = maxcameraPos;
		this.ctx.translate(this.cameraPos, 0);

		this.addObjectsToMap(this.bgLayers);
		this.addObjectsToMap(this.clouds);
		this.character.draw(this.ctx);
		// this.character.drawFrame(this.ctx);
		this.addObjectsToMap(this.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.ctx.translate(-this.cameraPos, 0);

		this.level.healthBar.draw(this.ctx);
		this.level.coinBar.draw(this.ctx);
		this.level.bottleBar.draw(this.ctx);

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
			// if (object instanceof Chicken) object.drawFrame(this.ctx);
		});
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrowObjects();
		}, 200);
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead()) {
				if (!this.character.isHurt()) {
					this.character.isHit();
					this.level.healthBar.setPercentage(this.character.energy);
				}
			} else if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead()) {
				if (!(enemy instanceof BossChicken)) enemy.die();
				this.character.jump(15);
				setTimeout(() => {
					const currentIndex = this.level.enemies.indexOf(enemy);
					this.level.enemies.splice(currentIndex, 1);
				}, 1000);
			}
		});
	}

	checkThrowObjects() {
		if (Keyboard.KEY_S) {
			const bottle = new ThrowableObject(
				this.canvas.height,
				this.character.xPos + this.character.width * 0.7,
				this.character.xPos,
				this.character.yPos * 1.8,
				this.character.flipDirection,
			);
			this.throwableObjects.push(bottle);
		}
	}
}
