import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	speedX = 10;
	longIdle = false;
	defaultYPos;
	keyboard;
	lastAction = Date.now() + 10000;

	constructor(canvasHeight, maxWidth, keyboard) {
		super();
		this.keyboard = keyboard;
		this.loadAllImages();
		this.initDimensions(canvasHeight);
		this.applyGravity();
		this.animate(maxWidth);
	}

	loadAllImages() {
		this.loadImg(ImageHub.PEPE.idle[0]);
		this.loadImages(ImageHub.PEPE.idle);
		this.loadImages(ImageHub.PEPE.longIdle);
		this.loadImages(ImageHub.PEPE.walk);
		this.loadImages(ImageHub.PEPE.jump);
		this.loadImages(ImageHub.PEPE.hurt);
		this.loadImages(ImageHub.PEPE.dead);
	}

	initDimensions(canvasHeight) {
		this.height = canvasHeight * 0.6;
		this.width = this.height * 0.52;
		this.defaultYPos = canvasHeight * 0.9 - this.height;
		this.yPos = this.defaultYPos;
		this.xPos = this.width;
	}

	animate(maxWidth) {
		IntervalHub.startInterval(
			"pepe-movement",
			() => {
				this.handleWalking(maxWidth);
				this.handleJumping();
				this.handleDead();
			},
			1000 / 60,
		);

		IntervalHub.startInterval(
			"pepe-animation",
			() => {
				this.handleAnimations();
			},
			250,
		);
	}

	handleWalking(maxWidth) {
		if (this.keyboard.RIGHT && this.xPos < maxWidth - this.width) {
			this.flipDirection = false;
			this.moveRight();
			this.resetIdleTimer();
		}

		if (this.keyboard.LEFT && this.xPos > 0) {
			this.flipDirection = true;
			this.moveLeft();
			this.resetIdleTimer();
		}
	}

	handleJumping() {
		if ((this.keyboard.SPACE || this.keyboard.UP) && !this.isAboveGround()) {
			this.jump(this.height * 0.08);
			this.resetIdleTimer();
		}
	}

	handleDead() {
		if (this.isDead()) {
			setTimeout(() => {
				IntervalHub.stopInterval("pepe-movement");
				return;
			}, 1000);
		}
	}

	handleAnimations() {
		if (this.isLongIdle()) {
			this.showAnimation(ImageHub.PEPE.longIdle);
		} else if ((this.keyboard.RIGHT || this.keyboard.LEFT) && !this.isAboveGround() && !this.isHurt()) {
			this.showAnimation(ImageHub.PEPE.walk);
		} else if (this.isAboveGround()) {
			this.showAnimation(ImageHub.PEPE.jump);
		} else if (this.isHurt()) {
			this.showAnimation(ImageHub.PEPE.hurt);
		} else if (this.isDead()) {
			this.showAnimation(ImageHub.PEPE.dead);
		} else {
			this.showAnimation(ImageHub.PEPE.idle);
		}
	}

	resetIdleTimer() {
		this.lastAction = Date.now();
	}

	isLongIdle() {
		return (Date.now() - this.lastAction) / 1000 > 5;
	}
}
