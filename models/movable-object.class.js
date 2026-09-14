import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { AudioHub } from "../hubs/audio-hub.class.js";

/**
 * Represents the MovableObject game object and extends DrawableObject.
 */
export class MovableObject extends DrawableObject {
	speedX = 0.15;
	speedY = 0;
	acceleration = 2.5;
	energy = 100;
	lastHit = -1;
	movementInterval;
	animationInterval;
	gravityInterval;
	hurtSound;

	/**
	 * Handles move right for the game.
	 */
	moveRight() {
		if (!this.isDead()) {
			this.xPos += this.speedX;
		}
	}

	/**
	 * Handles move left for the game.
	 */
	moveLeft() {
		if (!this.isDead() && this.xPos > 0) {
			this.xPos -= this.speedX;
		}
	}

	/**
	 * Handles jump for the game.
	 * @param {number} speedY - speedY value.
	 */
	jump(speedY) {
		if (!this.isDead()) this.speedY = speedY;
	}

	/**
	 * Handles is falling for the game.
	 */
	isFalling() {
		return this.speedY < 0;
	}

	/**
	 * Handles apply gravity for the game.
	 */
	applyGravity() {
		this.gravityInterval = IntervalHub.startInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.yPos -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
	}

	/**
	 * Handles is above ground for the game.
	 */
	isAboveGround() {
		return this.yPos < this.yPosGround;
	}

	/**
	 * Handles is above obj for the game.
	 * @param {Object} obj - obj value.
	 */
	isAboveObj(obj) {
		return this.ryPos < obj.ryPos + 20;
	}

	/**
	 * Handles is colliding for the game.
	 * @param {Object} obj - obj value.
	 */
	isColliding(obj) {
		return (
			this.rxPos + this.rWidth > obj.rxPos &&
			this.ryPos + this.rHeight > obj.ryPos &&
			this.rxPos < obj.rxPos + obj.rWidth &&
			this.ryPos < obj.ryPos + obj.rHeight
		);
	}

	/**
	 * Handles is hurt for the game.
	 */
	isHurt() {
		const timePassed = (Date.now() - this.lastHit) / 1000;
		return timePassed < 1;
	}

	/**
	 * Handles is hit for the game.
	 * @param {number} damage - damage value.
	 */
	isHit(damage) {
		if (this.lastAction) this.lastAction = Date.now();
		this.energy -= damage;
		if (this.hurtSound) AudioHub.playOne(this.hurtSound);
		if (this.energy < 0) this.energy = 0;
		this.lastHit = Date.now();
	}

	/**
	 * Handles is invulnerable for the game.
	 */
	isInvulnerable() {
		const timePassed = (Date.now() - this.lastHit) / 1000;
		return timePassed < 1.5;
	}

	/**
	 * Handles is dead for the game.
	 */
	isDead() {
		return this.energy === 0;
	}
}
