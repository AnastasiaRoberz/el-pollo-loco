import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Character extends MovableObject {
	speedX = 10;
	longIdle = false;
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
		this.loadImages(ImageHub.PEPE.idle.frames);
		this.loadImages(ImageHub.PEPE.longIdle.frames);
		this.loadImages(ImageHub.PEPE.longIdleFlip.frames);
		this.loadImages(ImageHub.PEPE.walk.frames);
		this.loadImages(ImageHub.PEPE.jump.frames);
		this.loadImages(ImageHub.PEPE.hurt.frames);
		this.loadImages(ImageHub.PEPE.dead.frames);
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
		if (Keyboard.RIGHT && this.xPos < Level.maxWidth - this.width) {
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
			this.jump(this.height * 0.06);
			this.resetIdleTimer();
		}
	}

	handleAnimations() {
		if (this.isDead()) {
			this.showAnimationOnce(ImageHub.PEPE.dead.frames);
		} else if (this.isHurt()) {
			this.showAnimation(ImageHub.PEPE.hurt.frames);
		} else if (this.isAboveGround()) {
			this.showAnimation(ImageHub.PEPE.jump.frames);
		} else if (Keyboard.RIGHT || Keyboard.LEFT) {
			this.showAnimation(ImageHub.PEPE.walk.frames);
		} else if (this.isLongIdle()) {
			this.showAnimation(ImageHub.PEPE.longIdle.frames);
		} else {
			this.showAnimation(ImageHub.PEPE.idle.frames);
		}
	}

	resetIdleTimer() {
		this.lastAction = Date.now();
	}

	isLongIdle() {
		return (Date.now() - this.lastAction) / 1000 > 15;
	}
}
