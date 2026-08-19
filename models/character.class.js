import { ImageHub } from "./imgHub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movableObject.class.js";

export class Character extends MovableObject {
	speed = 10;
	longIdle = false;

	constructor(canvasWidth, canvasHeight) {
		super();
		this.height = canvasHeight * 0.6;
		this.width = this.height * 0.52;
		this.yPos = canvasHeight * 0.9 - this.height;
		this.xPos = this.width;
		this.loadImg(ImageHub.PEPE.idle[0]);
		this.loadImages(ImageHub.PEPE.idle);
		this.loadImages(ImageHub.PEPE.walk);
		this.loadImages(ImageHub.PEPE.jump);
		this.animate();
	}

	animate() {
		setInterval(() => {
			if (Keyboard.RIGHT) {
				this.flipDirection = false;
				this.moveRight();
			}

			if (Keyboard.LEFT) {
				this.flipDirection = true;
				this.moveLeft();
			}

			if (Keyboard.SPACE) this.jump();
		}, 1000 / 60);

		setInterval(() => {
			if (this.longIdle) {
				this.showAnimation(ImageHub.PEPE.longIdle);
			} else if (this.isDead) {
				this.showAnimation(ImageHub.PEPE.dead);
			} else if (this.isHurt) {
				this.showAnimation(ImageHub.PEPE.hurt);
			} else if (this.isAboveGround) {
				this.showAnimation(ImageHub.PEPE.jump);
			} else if (Keyboard.RIGHT || Keyboard.LEFT) {
				this.showAnimation(ImageHub.PEPE.walk);
			} else {
				this.showAnimation(ImageHub.PEPE.idle);
			}
		}, 300);
	}

	jump() {}
}
