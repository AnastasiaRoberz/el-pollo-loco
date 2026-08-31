import { IntervalHub } from "../hubs/interval-hub.class.js";
import { DrawableObject } from "./drawable-object.class.js";

export class CollectableObject extends DrawableObject {
	images;

	animate() {
		IntervalHub.startInterval(() => {
			this.showAnimation(this.images);
		}, 450);
	}
}
