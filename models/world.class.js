import { Character } from "./character.class.js";
import { Level } from "./level.class.js";

export class World {
	canvas;
	ctx;
	character;
	enemies = [];
	bgLayers = [];
	clouds = [];
	cameraPos;
	level;
	maxWidth;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.level = new Level(this.canvas, 2, 5);
		this.maxWidth = this.level.maxWidth;
		this.character = new Character(this.canvas.height, this.maxWidth);
		this.bgLayers = this.level.bgLayers;
		this.clouds = this.level.clouds;
		this.enemies = this.level.enemies;
		this.draw();
	}

	draw() {
		const maxcameraPos = -(this.maxWidth - this.canvas.width);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.cameraPos = -this.character.xPos + this.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < maxcameraPos) this.cameraPos = maxcameraPos;
		this.ctx.translate(this.cameraPos, 0);

		this.addObjectsToMap(this.bgLayers);
		this.addObjectsToMap(this.clouds);
		this.character.draw(this.ctx);
		// this.character.drawFrame(this.ctx);
		this.addObjectsToMap(this.enemies);
		this.ctx.translate(-this.cameraPos, 0);

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
			// object.drawFrame(this.ctx);
		});
	}
}
