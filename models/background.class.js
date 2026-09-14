import { DrawableObject } from "./drawable-object.class.js";
import { World } from "./world.class.js";

/**
 * Represents the BackgroundLayer game object and extends DrawableObject.
 */
export class BackgroundLayer extends DrawableObject {
	yPos = 0;

	/**
	 * Creates and initializes the object.
	 * @param {string} imgPath - imgPath value.
	 * @param {number} xPos - xPos value.
	 */
	constructor(imgPath, xPos) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = World.canvas.width;
		this.height = World.canvas.height;
	}
}
