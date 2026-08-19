import { MovableObject } from "./movableObject.class.js";

export class Cloud extends MovableObject {
	yPos = 0;
	width = 1280;
	height = 720;

	constructor() {
		super("5_background/layers/4_clouds/full.png");

		this.xPos = -Math.random() * 500;
	}
}
