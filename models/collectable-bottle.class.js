import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class CollectableBottle extends CollectableObject {
	offset = { topRatio: 0.2, bottomRatio: 0.1, leftRatio: 0.29, rightRatio: 0.19 };

	constructor() {
		super();
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.xPos = Math.random() * Level.maxWidth;
		this.yPos = World.canvas.height * 0.76;
		this.loadImg(ImageHub.BOTTLE.onGround[0]);
		this.loadImages(ImageHub.BOTTLE.onGround);
		this.animate();
	}

	animate() {
		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(ImageHub.BOTTLE.onGround);
		}, 350);
	}
}
