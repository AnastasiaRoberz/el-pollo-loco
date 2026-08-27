import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	imagesWalk = [];
	imgDead;

	constructor() {
		super();
		this.speedX = 0.15 + Math.random() * 0.35;
	}

	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		this.animationInterval = IntervalHub.startInterval(() => {
			this.showAnimation(this.imagesWalk);
		}, 100);
	}

	die() {
		this.energy = 0;
		IntervalHub.stopInterval(this.movementInterval);
		IntervalHub.stopInterval(this.animationInterval);
		this.loadImg(this.imgDead);
	}
}
