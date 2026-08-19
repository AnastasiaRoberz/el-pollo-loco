import { MovableObject } from "./movableObject.class.js";

export class BackgroundLayer extends MovableObject {
	yPos = 0;
	width = 1280;
	height = 720;

	constructor(layerFolder) {
		super("5_background/layers/" + layerFolder + "/full.png");
	}
}
