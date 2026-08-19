import { MovableObject } from "./movableObject.class.js";

export class Cloud extends MovableObject {
	yPos = 0;
	width = 1280;
	height = 720;

	constructor(imgPath, xPos) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.moveLeft();
			if (this.xPos <= -this.width) this.xPos = 720;
		}, 1000 / 60);
	}
}
