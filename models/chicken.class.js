import { MovableObject } from "./movableObject.class.js";

export class Chicken extends MovableObject {
	speed = 0.5;
	imagesWalk = [];

	constructor() {
		super("3_enemies_chicken/chicken_normal/1_walk/3_w.png");

		this.xPos = 200 + Math.random() * 500;
	}
}
