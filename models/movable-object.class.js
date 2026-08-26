import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { LevelHub } from "./level-hub.class.js";

export class MovableObject extends DrawableObject {
	flipDirection = false;
	speedX = 0.15;
	speedY = 0;
	acceleration = 1.5;
	energy = 100;
	lastHit = 0;

	drawFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(
			this.xPos + this.offset.left,
			this.yPos + this.offset.top,
			this.width - this.offset.left - this.offset.right,
			this.height - this.offset.top - this.offset.bottom,
		);
		ctx.stroke();
	}

	moveRight() {
		if (!this.isDead()) this.xPos += this.speedX;
	}

	moveLeft() {
		if (!this.isDead()) this.xPos -= this.speedX;
	}

	jump(speedY) {
		if (!this.isDead()) this.speedY = speedY;
	}

	applyGravity(name) {
		IntervalHub.startInterval(
			`gravity_${name}`,
			() => {
				if (this.isAboveGround() || this.speedY > 0) {
					this.yPos -= this.speedY;
					this.speedY -= this.acceleration;
				} else {
					this.yPos = this.defaultYPos;
					this.speedY = 0;
				}
			},
			1000 / 25,
		);
	}

	isAboveGround() {
		return this.yPos < this.defaultYPos;
	}

	isColliding(obj) {
		return (
			this.xPos + this.width > obj.xPos &&
			this.yPos + this.height > obj.yPos &&
			this.xPos < obj.xPos + obj.width &&
			this.yPos < obj.yPos + obj.height
		);
	}

	isHurt() {
		const timePassed = (Date.now() - this.lastHit) / 1000;
		return timePassed < 1;
	}

	isHit() {
		this.energy -= LevelHub.LEVEL_MEDIUM.damage;
		IntervalHub.pauseInterval("pepe-movement");
		setTimeout(() => {
			IntervalHub.resumeInterval("pepe-movement");
		}, 500);
		if (this.energy < 0) this.energy = 0;
		this.lastHit = Date.now();
	}

	isDead() {
		return this.energy === 0;
	}

	die() {
		this.energy = 0;
	}
}
