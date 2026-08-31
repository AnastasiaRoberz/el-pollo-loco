import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { World } from "./world.class.js";

export class CollectableCoin extends CollectableObject {
	offset = { topRatio: 0.35, bottomRatio: 0.35, leftRatio: 0.35, rightRatio: 0.35 };

	constructor(xPos, yPos) {
		super();
		this.height = World.canvas.height * 0.1;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = yPos;
		this.loadImg(ImageHub.COIN[0]);
		this.loadImages(ImageHub.COIN);
		this.animate();
	}

	animate() {
		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(ImageHub.COIN);
		}, 400);
	}
}
