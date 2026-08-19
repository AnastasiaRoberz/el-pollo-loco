import { ImageHub } from "./imgHub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movableObject.class.js";

export class Character extends MovableObject {
	xPos = 100;
	yPos = 240;
	width = 203;
	height = 400;
	speed = 10;
	longIdle = false;

	constructor() {
		super("2_character_pepe/1_idle/idle/I-1.png");
	}

	move() {
		this.xPos += 20;
	}

	jump() {}
}
