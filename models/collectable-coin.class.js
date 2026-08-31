import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { World } from "./world.class.js";

export class CollectableCoin extends CollectableObject {
	images = ImageHub.COIN;
	offset = { topRatio: 0.35, bottomRatio: 0.35, leftRatio: 0.35, rightRatio: 0.35 };

	constructor(xPos, yPos) {
		super();
		this.initDimensions(xPos, yPos);
		this.loadImg(this.images[0]);
		this.loadImages(this.images);
		this.setRealFrame();
		this.animate();
	}

	initDimensions(xPos, yPos) {
		this.height = World.canvas.height * 0.1;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = yPos;
	}
}
