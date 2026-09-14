import { AudioHub } from "../hubs/audio-hub.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class ThrowableObject extends MovableObject {
	speedY = 30;
	speedX = 20;
	hasHit = false;
	offset = { topRatio: 0.16, bottomRatio: 0.13, leftRatio: 0.14, rightRatio: 0.14 };
	soundPlayed = false;

	constructor(xPos, yPos, flipDirection) {
		super();
		this.initDimensions(xPos, yPos);
		this.loadAllImages();
		this.applyGravity();
		this.throw(flipDirection);
	}

	initDimensions(xPos, yPos) {
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.yPos = yPos;
		this.xPos = xPos;
		this.yPosGround = World.canvas.height * 0.86 - this.height + this.offset.bottomRatio * this.height;
	}

	loadAllImages() {
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
	}

	throw(flipDirection) {
		this.animationInterval = IntervalHub.startInterval(() => {
			if (this.bottleHitGround() || this.hasHit) {
				this.handleBottleImpact();
			} else {
				this.moveBottle(flipDirection);
			}
		}, 50);
	}

	handleBottleImpact() {
		IntervalHub.stopInterval(this.gravityInterval);
		if (!this.soundPlayed) {
			this.soundPlayed = true;
			AudioHub.playOne(AudioHub.BOTTLE_BREAK);
		}
		this.showAnimationOnce(ImageHub.BOTTLE.splash);
		setTimeout(() => {
			IntervalHub.stopInterval(this.animationInterval);
		}, 1000);
	}

	moveBottle(flipDirection) {
		const images = flipDirection ? ImageHub.BOTTLE.reverseRotation : ImageHub.BOTTLE.rotation;
		this.showAnimation(images);
		this.xPos += flipDirection ? -this.speedX : this.speedX;
	}

	isAboveGround() {
		return true;
	}

	bottleHitGround() {
		return this.yPos >= this.yPosGround;
	}
}
