import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";
import { AudioHub } from "../hubs/audio-hub.class.js";

/**
 * Represents the NormalChicken game object and extends Chicken.
 */
export class NormalChicken extends Chicken {
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk.frames;
	imgDead = ImageHub.NORMAL_CHICKEN.dead.frame;
	audio = AudioHub.CHICKEN_DEAD;
	offset = { topRatio: 0.06, bottomRatio: 0.02, leftRatio: 0.02, rightRatio: 0.03 };

	/**
	 * Creates and initializes the object.
	 * @param {number} xPos - xPos value.
	 * @param {number} speedX - speedX value.
	 */
	constructor(xPos, speedX) {
		super();
		this.initDimensions(xPos);
		this.speedX = speedX;
		this.loadImg(this.imagesWalk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}

	/**
	  * Handles init dimensions for the game.
	 * @param {number} xPos - xPos value.
	 */
	initDimensions(xPos) {
		this.height = World.canvas.height * 0.18;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = World.canvas.height * 0.88 - this.height;
	}
}
