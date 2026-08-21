import { MovableObject } from "./movable-object.class.js";

export class BackgroundLayer extends MovableObject {
	yPos = 0;

	constructor(imgPath, xPos, width, height) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = width;
		this.height = height;
	}
}
