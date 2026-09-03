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

	constructor() {
		super();
		this.initDimensions();
		this.loadAllImages();
		this.applyGravity();
		this.animate();
	}

	initDimensions() {
		this.height = World.canvas.height * 0.6;
		this.width = this.height * 0.51;
		this.defaultYPos = World.canvas.height * 0.9 - this.height;
		this.yPos = this.defaultYPos;
		this.xPos = this.width;
	}

	loadAllImages() {
		this.offset = ImageHub.PEPE.idle.offset;
		this.loadImg(ImageHub.PEPE.idle.frames[0]);
		Object.values(ImageHub.PEPE).forEach((state) => this.loadImages(state.frames));
	}

	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			this.handleWalking();
			this.handleJumping();
		}, 1000 / 60);

		IntervalHub.startInterval(() => {
			this.animationTick++;
			this.handleAnimations();
		}, 50);
	}

	handleWalking() {
		if (Keyboard.RIGHT && this.xPos < Level.maxWidth - this.width) {
			this.flipDirection = false;
			this.moveRight();
			this.lastAction = Date.now();
		}

		if (Keyboard.LEFT && this.xPos > 0) {
			this.flipDirection = true;
			this.moveLeft();
			this.lastAction = Date.now();
		}
	}

	handleJumping() {
		if ((Keyboard.SPACE || Keyboard.UP) && !this.isAboveGround()) {
			this.jump(this.height * 0.06);
			this.lastAction = Date.now();
		}
	}

	handleAnimations() {
		if (this.isDead()) {
			this.offset = ImageHub.PEPE.dead.offset;
			this.showAnimationOnce(ImageHub.PEPE.dead.frames);
		} else if (this.isHurt()) {
			this.offset = ImageHub.PEPE.hurt.offset;
			this.showAnimation(ImageHub.PEPE.hurt.frames);
		} else if (this.isAboveGround()) {
			this.offset = ImageHub.PEPE.jump.offset;
			if (this.animationTick % 2 === 0) this.showAnimationOnce(ImageHub.PEPE.jump.frames);
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

	isLongIdle() {
		return (Date.now() - this.lastAction) / 1000 > 15;
	}
}
