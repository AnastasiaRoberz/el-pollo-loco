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
			if (this.energy > 0) this.moveLeft();
		}, 1000 / 60);

		setInterval(() => {
			if (this.energy > 0) this.showAnimation(this.imagesWalk);
		}, 100);
	}

	die() {
		this.energy = 0;
		this.loadImg(this.imgDead);
	}
}
