import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { World } from "./world.class.js";

export class CollectableCoin extends CollectableObject {
	constructor(xPos, yPos) {
		super();
		this.height = World.canvas.height * 0.1;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = yPos;
		this.id = World.idCounter;
		World.idCounter++;
		this.loadImg(ImageHub.COIN[0]);
		this.loadImages(ImageHub.COIN);
		this.animate();
	}

	animate() {
		IntervalHub.startInterval(
			`coin_${this.id}`,
			() => {
				this.showAnimation(ImageHub.COIN);
			},
			400,
		);
	}
}
