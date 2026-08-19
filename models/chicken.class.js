import { MovableObject } from "./movableObject.class.js";

export class Chicken extends MovableObject {
	speed = 0.5;
	imagesWalk = [];

	constructor() {
		super();
		this.xPos = Math.random() * 960 * 2;
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
