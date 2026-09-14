import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

/**
 * Represents the CollectableBottle game object and extends CollectableObject.
 */
export class CollectableBottle extends CollectableObject {
	images = ImageHub.BOTTLE.onGround;
	offset = { topRatio: 0.2, bottomRatio: 0.1, leftRatio: 0.29, rightRatio: 0.19 };

	/**
	 * Creates and initializes the object.
	 * @param {*} x - x value.
	 */
	constructor(x) {
		super();
		this.initDiemensions(x);
		this.loadImg(this.images[0]);
		this.loadImages(this.images);
		this.animate();
	}

	/**
	  * Handles init diemensions for the game.
	 * @param {*} x - x value.
	 */
	initDiemensions(x) {
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.xPos = x;
		this.yPos = World.canvas.height * 0.76;
	}
}
