import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

/**
 * Represents the Cloud game object and extends MovableObject.
 */
export class Cloud extends MovableObject {
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
		this.animate();
	}

	/**
	  * Handles animate for the game.
	 */
	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			this.moveLeft();
			if (this.xPos <= -this.width) this.xPos = this.width * 2;
		}, 1000 / 60);
	}
}
