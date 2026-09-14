import { AudioHub } from "../hubs/audio-hub.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

/**
 * Represents the Character game object and extends MovableObject.
 */
export class Character extends MovableObject {
	speedX = 10;
	lastAction = Date.now();
	animationTick = 0;
	deadJumpTriggered = false;
	isJumping = false;
	landingTriggered = false;
	wasHurt = false;

	/**
	 * Creates and initializes the object.
	 */
	constructor() {
		super();
		this.loadAllImages();
		this.initDimensions();
		this.applyGravity();
		this.animate();
		this.hurtSound = AudioHub.PEPE_DAMAGE;
	}

	/**
	  * Handles init dimensions for the game.
	 */
	initDimensions() {
		this.height = World.canvas.height * 0.6;
		this.width = this.height * 0.51;
		this.xPos = this.width;
		this.yPosGround = World.canvas.height * 0.86 - this.height + this.offset.bottomRatio * this.height;
		this.yPos = this.yPosGround;
	}

	/**
	  * Handles load all images for the game.
	 */
	loadAllImages() {
		this.offset = ImageHub.PEPE.idle.offset;
		this.loadImg(ImageHub.PEPE.idle.frames[0]);
		Object.values(ImageHub.PEPE).forEach((state) => this.loadImages(state.frames));
	}

	/**
	  * Handles animate for the game.
	 */
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

	/**
	  * Handles handle audio for the game.
	 */
	handleAudio() {
		if (this.isDead()) {
			this.handleDeadAudio();
			return;
		}

		this.handleMovementAudio();
	}

	/**
	  * Handles handle dead audio for the game.
	 */
	handleDeadAudio() {
		AudioHub.stopOne(AudioHub.PEPE_RUN);
		AudioHub.stopOne(AudioHub.PEPE_SNORING);
		AudioHub.stopOne(AudioHub.PEPE_DAMAGE);
	}

	/**
	  * Handles handle movement audio for the game.
	 */
	handleMovementAudio() {
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

	/**
	  * Handles handle walking for the game.
	 */
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

	/**
	  * Handles handle jumping for the game.
	 */
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

	/**
	  * Handles handle animations for the game.
	 */
	handleAnimations() {
		if (this.isDead()) return this.handleDeadAnimation();
		if (this.isHurt() && !this.isJumping) return this.handleHurtAnimation();
		if (this.isJumping || this.isAboveGround()) return this.handleJumpAnimation();
		if (Keyboard.RIGHT || Keyboard.LEFT) return this.handleWalkAnimation();
		if (this.isLongIdle()) return this.handleIdleAnimation();
		this.showIdleAnimation();
	}

	/**
	  * Handles handle jump animation for the game.
	 */
	handleJumpAnimation() {
		this.offset = ImageHub.PEPE.jump.offset;
		this.showJumpAnimation(ImageHub.PEPE.jump.frames);
	}

	/**
	  * Handles handle dead animation for the game.
	 */
	handleDeadAnimation() {
		this.offset = ImageHub.PEPE.dead.offset;
		this.showDeadAnimation(ImageHub.PEPE.dead.frames);
	}

	/**
	  * Handles handle hurt animation for the game.
	 */
	handleHurtAnimation() {
		this.offset = ImageHub.PEPE.hurt.offset;
		this.showAnimation(ImageHub.PEPE.hurt.frames);
	}

	/**
	  * Handles handle walk animation for the game.
	 */
	handleWalkAnimation() {
		this.offset = ImageHub.PEPE.walk.offset;
		this.showAnimation(ImageHub.PEPE.walk.frames);
	}

	/**
	  * Handles handle idle animation for the game.
	 */
	handleIdleAnimation() {
		const state = ImageHub.PEPE.longIdle;
		const interval = this.flipDirection ? 8 : 6;
		this.offset = state.offset;
		if (this.animationTick % interval === 0) this.showAnimation(state.frames);
	}

	/**
	  * Handles show idle animation for the game.
	 */
	showIdleAnimation() {
		this.offset = ImageHub.PEPE.idle.offset;
		if (this.animationTick % 6 === 0) this.showAnimation(ImageHub.PEPE.idle.frames);
	}

	/**
	  * Handles show jump animation for the game.
	 * @param {string[]} images - images value.
	 */
	showJumpAnimation(images) {
		if (!this.isAboveGround() && this.speedY === 0 && !this.landingTriggered) return this.handleJumpStart(images);
		if (this.speedY > 0) return this.handleJumpDescent(images);
		if (this.speedY < 0 && this.isAboveGround()) return this.handleJumpAscent(images);
		if (!this.isAboveGround()) this.handleJumpLanding(images);
	}

	/**
	  * Handles handle jump start for the game.
	 * @param {string[]} images - images value.
	 */
	handleJumpStart(images) {
		this.img = this.imgCache[images[this.currentImage]];
		if (this.currentImage < 3) this.currentImage++;
		else if (this.currentImage === 3) this.jump(30);
	}

	/**
	  * Handles handle jump descent for the game.
	 * @param {string[]} images - images value.
	 */
	handleJumpDescent(images) {
		this.img = this.imgCache[images[3]];
		this.currentImage = 4;
	}

	/**
	  * Handles handle jump ascent for the game.
	 * @param {string[]} images - images value.
	 */
	handleJumpAscent(images) {
		if (this.currentImage < 4 || this.currentImage > 6) this.currentImage = 4;
		this.img = this.imgCache[images[this.currentImage]];
		if (this.currentImage < 6) this.currentImage++;
	}

	/**
	  * Handles handle jump landing for the game.
	 * @param {string[]} images - images value.
	 */
	handleJumpLanding(images) {
		this.landingTriggered = true;
		if (this.currentImage < 7) this.currentImage = 7;
		this.img = this.imgCache[images[this.currentImage]];
		if (this.currentImage < 8) this.currentImage++;
		else this.resetJump();
	}

	/**
	  * Handles reset jump for the game.
	 */
	resetJump() {
		this.isJumping = false;
		this.landingTriggered = false;
		this.currentImage = 0;
		this.speedY = 0;
	}

	/**
	  * Handles show dead animation for the game.
	 * @param {string[]} images - images value.
	 */
	showDeadAnimation(images) {
		this.resetDeadAnimation(images);
		if (this.currentImage === 3 && !this.deadJumpTriggered) {
			this.deadJumpTriggered = true;
			this.startDeathFall();
		}
		this.showDeadFrame(images);
	}

	/**
	  * Handles reset dead animation for the game.
	 * @param {string[]} images - images value.
	 */
	resetDeadAnimation(images) {
		if (this.currentAnimation !== images) {
			this.currentAnimation = images;
			this.currentImage = 0;
			this.deadJumpTriggered = false;
		}
	}

	/**
	  * Handles show dead frame for the game.
	 * @param {string[]} images - images value.
	 */
	showDeadFrame(images) {
		if (this.currentImage < images.length) {
			this.img = this.imgCache[images[this.currentImage]];
			this.currentImage++;
		} else {
			this.img = this.imgCache[images[images.length - 1]];
		}
	}

	/**
	  * Handles start death fall for the game.
	 */
	startDeathFall() {
		IntervalHub.stopInterval(this.gravityInterval);

		let deathSpeedY = 20;
		const gravity = 0.9;

		IntervalHub.startInterval(() => {
			this.yPos -= deathSpeedY;
			deathSpeedY -= gravity;
		}, 1000 / 30);
	}

	/**
	  * Handles is long idle for the game.
	 */
	isLongIdle() {
		return (Date.now() - this.lastAction) / 1000 > 15;
	}
}
