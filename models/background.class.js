import { DrawableObject } from "./drawable-object.class.js";
import { World } from "./world.class.js";

export class BackgroundLayer extends DrawableObject {
	yPos = 0;

	constructor(imgPath, xPos) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = World.canvas.width;
		this.height = World.canvas.height;
	}
}
