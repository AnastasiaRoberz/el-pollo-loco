import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class CollectableBottle extends CollectableObject {
	images = ImageHub.BOTTLE.onGround;
	offset = { topRatio: 0.2, bottomRatio: 0.1, leftRatio: 0.29, rightRatio: 0.19 };

	constructor() {
		super();
		this.initDiemensions();
		this.loadImg(this.images[0]);
		this.loadImages(this.images);
		this.animate();
		this.setRealFrame();
	}

	initDiemensions() {
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.xPos = Math.random() * Level.maxWidth;
		this.yPos = World.canvas.height * 0.76;
	}
}
