import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class CollectableBottle extends CollectableObject {
	width;
	height;

	constructor() {
		super();
		this.id = World.idCounter;
		World.idCounter++;
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.xPos = Math.random() * Level.maxWidth;
		this.yPos = World.canvas.height * 0.76;
		this.loadImg(ImageHub.BOTTLE.onGround[0]);
		this.loadImages(ImageHub.BOTTLE.onGround);
		this.animate();
	}

	animate() {
		IntervalHub.startInterval(
			`botte_on_ground_${this.id}`,
			() => {
				this.showAnimation(ImageHub.BOTTLE.onGround);
			},
			350,
		);
	}
}
