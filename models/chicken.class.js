import { AudioHub } from "../hubs/audio-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the Chicken game object and extends MovableObject.
 */
export class Chicken extends MovableObject {
	imagesWalk = [];
	imgDead;
	audio;

	/**
	 * Creates and initializes the object.
	 */
	constructor() {
		super();
		this.speedX = 0.15 + Math.random() * 0.35;
	}

	/**
	  * Handles animate for the game.
	 */
	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(this.imagesWalk);
		}, 100);
	}

	/**
	  * Handles die for the game.
	 */
	die() {
		this.energy = 0;
		IntervalHub.stopInterval(this.movementInterval);
		IntervalHub.stopInterval(this.animationInterval);
		this.loadImg(this.imgDead);
		AudioHub.playOne(this.audio);
	}
}
