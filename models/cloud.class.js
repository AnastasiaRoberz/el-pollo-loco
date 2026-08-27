import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Cloud extends MovableObject {
	yPos = 0;

	constructor(imgPath, xPos) {
		super();
		this.loadImg(imgPath);
		this.xPos = xPos;
		this.width = World.canvas.width;
		this.height = World.canvas.height;
		this.id = World.idCounter;
		World.idCounter++;
		this.animate();
	}

	animate() {
		IntervalHub.startInterval(
			`cloud_animation_${this.id}`,
			() => {
				this.moveLeft();
				if (this.xPos <= -this.width) this.xPos = this.width * 2;
			},
			1000 / 60,
		);
	}
}
