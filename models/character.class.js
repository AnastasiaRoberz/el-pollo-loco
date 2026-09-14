import { AudioHub } from "../hubs/audio-hub.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Character extends MovableObject {
	speedX = 10;
	lastAction = Date.now();
	animationTick = 0;
	deadSoundPlayed = false;
	deadJumpTriggered = false;
	isJumping = false;
	landingTriggered = false;
	wasHurt = false;

	constructor() {
		super();
		this.loadAllImages();
		this.initDimensions();
		this.applyGravity();
		this.animate();
		this.hurtSound = AudioHub.PEPE_DAMAGE;
	}

	initDimensions() {
		this.height = World.canvas.height * 0.6;
		this.width = this.height * 0.51;
		this.xPos = this.width;
		this.yPosGround = World.canvas.height * 0.86 - this.height + this.offset.bottomRatio * this.height;
		this.yPos = this.yPosGround;
	}

	loadAllImages() {
		this.offset = ImageHub.PEPE.idle.offset;
		this.loadImg(ImageHub.PEPE.idle.frames[0]);
		Object.values(ImageHub.PEPE).forEach((state) => this.loadImages(state.frames));
	}

	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			this.handleAudio();
			this.handleWalking();
			this.handleJumping();
		}, 1000 / 60);

		this.animationInterval = IntervalHub.startInterval(() => {
			this.animationTick++;
			this.handleAnimations();
		}, 50);
	}

	handleAudio() {
		if (this.isDead()) {
			AudioHub.stopOne(AudioHub.PEPE_RUN);
			AudioHub.stopOne(AudioHub.PEPE_SNORING);
			AudioHub.stopOne(AudioHub.PEPE_DAMAGE);
			if (!this.deadSoundPlayed) {
				this.deadSoundPlayed = true;
				AudioHub.playOne(AudioHub.PEPE_DEAD);
			}
			return;
		}

		if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
			AudioHub.playOne(AudioHub.PEPE_RUN);
		} else {
			AudioHub.stopOne(AudioHub.PEPE_RUN);
		}

		if (this.isLongIdle()) {
			AudioHub.playOne(AudioHub.PEPE_SNORING);
		} else {
			AudioHub.stopOne(AudioHub.PEPE_SNORING);
		}
	}

	handleWalking() {
		if (this.isHurt()) return;
		if (Keyboard.RIGHT && this.xPos < Level.maxWidth - this.width) {
			this.flipDirection = false;
			this.moveRight();
			this.lastAction = Date.now();
		} else if (Keyboard.LEFT) {
			this.flipDirection = true;
			this.moveLeft();
			this.lastAction = Date.now();
		}
	}

	handleJumping() {
		if (this.isHurt()) return;
		if ((Keyboard.SPACE || Keyboard.UP) && !this.isAboveGround() && !this.isJumping) {
			this.isJumping = true;
			this.currentImage = 0;
			this.landingTriggered = false;
			this.lastAction = Date.now();
			AudioHub.playOne(AudioHub.PEPE_JUMP);
		}
	}

	handleAnimations() {
		if (this.isDead()) {
			this.offset = ImageHub.PEPE.dead.offset;
			this.showDeadAnimation(ImageHub.PEPE.dead.frames);
		} else if (this.isHurt() && !this.isJumping) {
			this.offset = ImageHub.PEPE.hurt.offset;
			this.showAnimation(ImageHub.PEPE.hurt.frames);
		} else if (this.isJumping || this.isAboveGround()) {
			this.offset = ImageHub.PEPE.jump.offset;
			this.showJumpAnimation(ImageHub.PEPE.jump.frames);
		} else if (Keyboard.RIGHT || Keyboard.LEFT) {
			this.offset = ImageHub.PEPE.walk.offset;
			this.showAnimation(ImageHub.PEPE.walk.frames);
		} else if (this.isLongIdle() && !this.flipDirection) {
			this.offset = ImageHub.PEPE.longIdle.offset;
			if (this.animationTick % 6 === 0) this.showAnimation(ImageHub.PEPE.longIdle.frames);
		} else if (this.isLongIdle() && this.flipDirection) {
			this.offset = ImageHub.PEPE.longIdleFlip.offset;
			if (this.animationTick % 8 === 0) this.showAnimation(ImageHub.PEPE.longIdleFlip.frames);
		} else {
			this.offset = ImageHub.PEPE.idle.offset;
			if (this.animationTick % 6 === 0) this.showAnimation(ImageHub.PEPE.idle.frames);
		}
	}

	showJumpAnimation(images) {
		if (!this.isAboveGround() && this.speedY === 0 && !this.landingTriggered) {
			this.img = this.imgCache[images[this.currentImage]];

			if (this.currentImage < 3) {
				this.currentImage++;
			} else if (this.currentImage === 3) {
				this.jump(30);
			}
			return;
		}

		if (this.speedY > 0) {
			this.img = this.imgCache[images[3]];
			this.currentImage = 4;
			return;
		}

		if (this.speedY < 0 && this.isAboveGround()) {
			if (this.currentImage < 4 || this.currentImage > 6) {
				this.currentImage = 4;
			}
			this.img = this.imgCache[images[this.currentImage]];
			if (this.currentImage < 6) {
				this.currentImage++;
			}
			return;
		}

		if (!this.isAboveGround()) {
			this.landingTriggered = true;
			if (this.currentImage < 7) {
				this.currentImage = 7;
			}
			this.img = this.imgCache[images[this.currentImage]];

			if (this.currentImage < 8) {
				this.currentImage++;
			} else {
				this.isJumping = false;
				this.landingTriggered = false;
				this.currentImage = 0;
				this.speedY = 0;
			}
		}
	}

	showDeadAnimation(images) {
		if (this.currentAnimation !== images) {
			this.currentAnimation = images;
			this.currentImage = 0;
			this.deadJumpTriggered = false;
		}

		if (this.currentImage === 3 && !this.deadJumpTriggered) {
			this.deadJumpTriggered = true;
			this.startDeathFall();
		}

		if (this.currentImage < images.length) {
			this.img = this.imgCache[images[this.currentImage]];
			this.currentImage++;
		} else {
			this.img = this.imgCache[images[images.length - 1]];
		}
	}

	startDeathFall() {
		IntervalHub.stopInterval(this.gravityInterval);

		let deathSpeedY = 20;
		const gravity = 0.9;

		IntervalHub.startInterval(() => {
			this.yPos -= deathSpeedY;
			deathSpeedY -= gravity;
		}, 1000 / 30);
	}

	isLongIdle() {
		return (Date.now() - this.lastAction) / 1000 > 15;
	}
}
