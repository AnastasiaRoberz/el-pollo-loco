import { IntervalHub } from "../hubs/interval-hub.class.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Represents the CollectableObject game object and extends DrawableObject.
 */
export class CollectableObject extends DrawableObject {
	images;

	/**
	  * Handles animate for the game.
	 */
	animate() {
		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(this.images);
		}, 450);
	}
}
