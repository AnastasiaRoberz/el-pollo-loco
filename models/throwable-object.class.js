import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
	speedY = 30;
	speedX = 20;

	constructor(canvasHeight, xPosRight, xPosLeft, yPos, flipDirection) {
		super();
		this.height = canvasHeight * 0.12;
		this.width = this.height;
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
		this.throw(xPosRight, xPosLeft, yPos, flipDirection);
	}

	throw(xPosRight, xPosLeft, yPos, flipDirection) {
		this.xPos = flipDirection ? xPosLeft : xPosRight;
		this.yPos = yPos;
		this.speedY = 30;
		this.applyGravity();
		IntervalHub.startInterval(
			"bottle",
			() => {
				this.showAnimation(ImageHub.BOTTLE.rotation);
				flipDirection ? (this.xPos -= this.speedX) : (this.xPos += this.speedX);
			},
			35,
		);
	}

	isAboveGround() {
		return true;
	}
}
