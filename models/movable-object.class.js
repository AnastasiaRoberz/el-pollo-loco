import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Level } from "./level.class.js";

export class MovableObject extends DrawableObject {
	speedX = 0.15;
	speedY = 0;
	acceleration = 1.5;
	energy = 100;
	lastHit = 0;
	movementInterval;
	animationInterval;
	gravityInterval;

	moveRight() {
		if (!this.isDead() && this.xPos < Level.maxWidth - this.width) {
			this.xPos += this.speedX;
		}
	}

	moveLeft() {
		if (!this.isDead() && this.xPos > 0) {
			this.xPos -= this.speedX;
		}
	}

	jump(speedY) {
		if (!this.isDead()) this.speedY = speedY;
	}

	isFalling() {
		return this.speedY < 0;
	}

	applyGravity() {
		this.gravityInterval = IntervalHub.startInterval(() => {
			if (this.isAboveObj() || this.speedY > 0) {
				this.yPos -= this.speedY;
				this.speedY -= this.acceleration;
				// } else {
				// 	this.yPos = this.defaultYPos;
				// 	this.speedY = 0;
			}
		}, 1000 / 25);
	}

	isAboveObj(obj = this.yPosGround) {
		return this.yPos < obj;
	}

	isColliding(obj) {
		return (
			this.rxPos + this.rWidth > obj.rxPos &&
			this.ryPos + this.rHeight > obj.ryPos &&
			this.rxPos < obj.rxPos + obj.rWidth &&
			this.ryPos < obj.ryPos + obj.rHeight
		);
	}

	isHurt() {
		const timePassed = (Date.now() - this.lastHit) / 1000;
		return timePassed < 1;
	}

	isHit(damage) {
		this.energy -= damage;
		// IntervalHub.pauseInterval(this.movementInterval, 6000);
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
