import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	speed = 0.5;
	imagesWalk = [];
	imgDead;

	constructor() {
		super();
	}

	animate() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		setInterval(() => {
			this.showAnimation(this.imagesWalk);
		}, 100);
	}
}
