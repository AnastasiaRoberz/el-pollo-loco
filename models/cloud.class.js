import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
	yPos = 0;

	constructor(imgPath, xPos, width, height) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = width;
		this.height = height;
		this.animate();
	}

	animate() {
		IntervalHub.startInterval(
			"cloud-animation",
			() => {
				this.moveLeft();
				if (this.xPos <= -this.width) this.xPos = this.width * 2;
			},
			1000 / 60,
		);
	}
}
