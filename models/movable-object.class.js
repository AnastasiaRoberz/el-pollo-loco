import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
	flipDirection = false;
	speedX = 0.15;
	speedY = 0;
	acceleration = 3;
	energy = 100;
	lastHit = 0;

	drawFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.xPos, this.yPos, this.width, this.height);
		ctx.stroke();
	}

	/**
	 * @param {string[]} images - Array mit Bildpfaden zu einem Zustand
	 */
	showAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imgCache[path];
		this.currentImage++;
	}

	moveRight() {
		this.xPos += this.speed;
	}

	moveLeft() {
		this.xPos -= this.speed;
	}

	jump() {
		this.speedY = 35;
	}

	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.yPos -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				this.yPos = this.defaultYPos;
				this.speedY = 0;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		return this.yPos < this.defaultYPos;
	}

	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit;
		timePassed = timePassed / 1000;
		return timePassed < 1;
	}

	isDead() {
		return this.energy === 0;
	}

	isColliding(obj) {
		return (
			this.xPos + this.width > obj.xPos &&
			this.yPos + this.height > obj.yPos &&
			this.xPos < obj.xPos + obj.width &&
			this.yPos < obj.yPos + obj.height
		);
	}

	isHit() {
		this.energy -= 5;
		if (this.energy < 0) this.energy = 0;
		this.lastHit = new Date().getTime();
	}
}
