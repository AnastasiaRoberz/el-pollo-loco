import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class Chicken extends MovableObject {
	imagesWalk = [];
	imgDead;

	constructor() {
		super();
		this.id = World.idCounter;
		World.idCounter++;
		this.speedX = 0.15 + Math.random() * 0.35;
	}

	animate() {
		IntervalHub.startInterval(
			`chicken-walk-${this.id}`,
			() => {
				this.moveLeft();
			},
			1000 / 60,
		);

		IntervalHub.startInterval(
			`chicken-animate-${this.id}`,
			() => {
				this.showAnimation(this.imagesWalk);
			},
			100,
		);
	}

	die() {
		this.energy = 0;
		IntervalHub.stopInterval(`chicken-walk-${this.id}`);
		IntervalHub.stopInterval(`chicken-animate-${this.id}`);
		this.loadImg(this.imgDead);
	}
}
