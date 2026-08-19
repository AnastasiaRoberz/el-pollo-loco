import { MovableObject } from "./movableObject.class.js";

export class BackgroundLayer extends MovableObject {
	yPos = 0;
	width = 1280;
	height = 720;

	constructor(imgPath, xPos) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
	}
}
