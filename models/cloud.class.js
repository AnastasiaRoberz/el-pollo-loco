import { MovableObject } from "./movableObject.class.js";

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
		setInterval(() => {
			this.moveLeft();
			if (this.xPos <= -this.width) this.xPos = 720;
		}, 1000 / 60);
	}
}
