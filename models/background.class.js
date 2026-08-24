import { DrawableObject } from "./drawable-object.class.js";

export class BackgroundLayer extends DrawableObject {
	yPos = 0;

	constructor(imgPath, xPos, width, height) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = width;
		this.height = height;
	}
}
