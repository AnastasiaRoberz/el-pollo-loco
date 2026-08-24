import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
	speedY = 20;
	speedX = 20;
	id;
	static idCounter = 0;

	constructor(canvasHeight, xPosRight, xPosLeft, yPos, flipDirection) {
		super();
		this.height = canvasHeight * 0.12;
		this.width = this.height;
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
		this.id = ThrowableObject.idCounter;
		ThrowableObject.idCounter++;
		this.throw(xPosRight, xPosLeft, yPos, flipDirection);
	}

	throw(xPosRight, xPosLeft, yPos, flipDirection) {
		this.xPos = flipDirection ? xPosLeft : xPosRight;
		this.yPos = yPos;
		this.speedY = 20;
		this.applyGravity(`botte_${this.id}`);

		IntervalHub.startInterval(
			`bottle_${this.id}`,
			() => {
				this.showAnimation(ImageHub.BOTTLE.rotation);
				flipDirection ? (this.xPos -= this.speedX) : (this.xPos += this.speedX);
			},
			50,
		);
	}

	isAboveGround() {
		return true;
	}
}
