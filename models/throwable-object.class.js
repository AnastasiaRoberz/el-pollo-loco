import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class ThrowableObject extends MovableObject {
	speedY = 20;
	speedX = 20;
	hasHit = false;
	offset = { topRatio: 0.16, bottomRatio: 0.13, leftRatio: 0.14, rightRatio: 0.14 };

	constructor(xPos, yPos, flipDirection) {
		super();
		this.initDiemsnions(xPos, yPos);
		this.loadAllImages();
		this.applyGravity();
		this.throw(flipDirection);
		this.splash();
	}

	initDiemsnions(xPos, yPos) {
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.yPos = yPos;
		this.xPos = xPos;
		this.defaultYPos = World.canvas.height * 0.4;
	}

	loadAllImages() {
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
	}

	throw(flipDirection) {
		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(ImageHub.BOTTLE.rotation);
			flipDirection ? (this.xPos -= this.speedX) : (this.xPos += this.speedX);
		}, 50);
	}

	splash() {
		if (this.bottleHitGround() || this.hasHit) {
			IntervalHub.stopInterval(this.animationInterval);
			IntervalHub.stopInterval(this.gravityInterval);
			IntervalHub.startInterval(() => {
				this.showAnimationOnce(ImageHub.BOTTLE.splash);
			}, 50);
		}
	}

	isAboveGround() {
		return true;
	}

	bottleHitGround() {
		return this.yPos >= this.defaultYPos;
	}
}
