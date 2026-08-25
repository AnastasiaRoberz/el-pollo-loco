import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Character extends MovableObject {
	speedX = 10;
	longIdle = false;
	defaultYPos;
	keyboard;
	lastAction = Date.now();

	constructor() {
		super();
		this.loadAllImages();
		this.initDimensions();
		this.applyGravity();
		this.animate();
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

	initDimensions() {
		this.height = World.canvas.height * 0.6;
		this.width = this.height * 0.52;
		this.defaultYPos = World.canvas.height * 0.9 - this.height;
		this.yPos = this.defaultYPos;
		this.xPos = this.width;
	}

	animate() {
		IntervalHub.startInterval(
			"pepe-movement",
			() => {
				this.handleWalking();
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

	handleWalking() {
		if (Keyboard.RIGHT && this.xPos < World.maxWidth - this.width) {
			this.flipDirection = false;
			this.moveRight();
			this.resetIdleTimer();
		}

		if (Keyboard.LEFT && this.xPos > 0) {
			this.flipDirection = true;
			this.moveLeft();
			this.resetIdleTimer();
		}
	}

	handleJumping() {
		if ((Keyboard.SPACE || Keyboard.UP) && !this.isAboveGround()) {
			this.jump(this.height * 0.08);
			this.resetIdleTimer();
		}
	}

	handleDead() {
		if (this.isDead()) {
			setTimeout(() => {
				console.log("Pepe ist tot");

				IntervalHub.stopInterval("pepe-movement");
				return;
			}, 1000);
		}
	}

	handleAnimations() {
		if (this.isLongIdle()) {
			this.showAnimation(ImageHub.PEPE.longIdle);
		} else if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround() && !this.isHurt()) {
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
		return (Date.now() - this.lastAction) / 1000 > 15;
	}
}
