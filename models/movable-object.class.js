import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { LevelHub } from "../hubs/level-hub.class.js";

export class MovableObject extends DrawableObject {
	flipDirection = false;
	speedX = 0.15;
	speedY = 0;
	acceleration = 1.5;
	energy = 100;
	lastHit = 0;
	movementInterval;
	animationInterval;
	gravityInterval;

	moveRight() {
		if (!this.isDead()) {
			this.xPos += this.speedX;
			this.setRealFrame();
		}
	}

	moveLeft() {
		if (!this.isDead()) {
			this.xPos -= this.speedX;
			this.setRealFrame();
		}
	}

	jump(speedY) {
		if (!this.isDead()) this.speedY = speedY;
	}

	applyGravity() {
		this.gravityInterval = IntervalHub.startInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.yPos -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				this.yPos = this.defaultYPos;
				this.speedY = 0;
			}
			this.setRealFrame();
		}, 1000 / 25);
	}

	isAboveGround() {
		return this.yPos < this.defaultYPos;
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

	isHit() {
		this.energy -= LevelHub.LEVEL_MEDIUM.damage;
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
