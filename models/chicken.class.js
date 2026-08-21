import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	static idCounter = 0;
	id;
	speed = 2.5;
	imagesWalk = [];
	imgDead;

	constructor() {
		super();
		this.id = Chicken.idCounter;
		Chicken.idCounter++;
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
		this.loadImg(this.imgDead);
		IntervalHub.stopInterval(`chicken-walk-${this.id}`);
		IntervalHub.stopInterval(`chicken-animate-${this.id}`);
	}

	static resetIdCounter() {
		Chicken.idCounter = 0;
	}
}
