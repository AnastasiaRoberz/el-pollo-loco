import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	speed = 10;
	longIdle = false;
	defaultYPos;

	constructor(canvasHeight, maxWidth) {
		super();
		this.height = canvasHeight * 0.6;
		this.width = this.height * 0.52;
		this.defaultYPos = canvasHeight * 0.9 - this.height;
		this.yPos = this.defaultYPos;
		this.xPos = this.width;
		this.loadImagesToCache();
		this.applyGravity();
		this.animate(maxWidth);
	}

	loadImagesToCache() {
		this.loadImg(ImageHub.PEPE.idle[0]);
		this.loadImages(ImageHub.PEPE.idle);
		this.loadImages(ImageHub.PEPE.longIdle);
		this.loadImages(ImageHub.PEPE.walk);
		this.loadImages(ImageHub.PEPE.jump);
		this.loadImages(ImageHub.PEPE.hurt);
		this.loadImages(ImageHub.PEPE.dead);
	}

	animate(maxWidth) {
		IntervalHub.startInterval(
			"pepe-moves",
			() => {
				if (Keyboard.RIGHT && this.xPos < maxWidth - this.width) {
					this.flipDirection = false;
					this.moveRight();
				}

				if (Keyboard.LEFT && this.xPos > 0) {
					this.flipDirection = true;
					this.moveLeft();
				}

				if ((Keyboard.SPACE || Keyboard.UP) && !this.isAboveGround()) this.jump(35);
			},
			1000 / 60,
		);

		IntervalHub.startInterval(
			"pepe-animation",
			() => {
				this.checkAnimation();
			},
			250,
		);
	}

	checkAnimation() {
		if (this.longIdle) {
			this.showAnimation(ImageHub.PEPE.longIdle);
		} else if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
			this.showAnimation(ImageHub.PEPE.walk);
		} else if (this.isAboveGround()) {
			this.showAnimation(ImageHub.PEPE.jump);
		} else if (this.isHurt()) {
			this.showAnimation(ImageHub.PEPE.hurt);
		} else if (this.isDead()) {
			this.showAnimation(ImageHub.PEPE.dead);
			this.loadImg(ImageHub.PEPE.dead[6]);
		} else {
			this.showAnimation(ImageHub.PEPE.idle);
		}
	}
}
