import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	static idCounter = 0;
	id;
	imagesWalk = [];
	imgDead;

	constructor() {
		super();
		this.id = Chicken.idCounter;
		Chicken.idCounter++;
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

	static resetIdCounter() {
		Chicken.idCounter = 0;
	}
}
