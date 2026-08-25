import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class ThrowableObject extends MovableObject {
	speedY = 20;
	speedX = 20;

	constructor(xPos, yPos, flipDirection) {
		super();
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
		this.id = World.idCounter;
		World.idCounter++;
		this.yPos = yPos;
		this.xPos = xPos;
		this.throw(flipDirection);
	}

	throw(flipDirection) {
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
