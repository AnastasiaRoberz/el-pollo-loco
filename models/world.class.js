import { BackgroundLayer } from "./background.class.js";
import { Character } from "./character.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./imgHub.class.js";
import { Level } from "./level.class.js";
import { NormalChicken } from "./normalChicken.class.js";

export class World {
	canvas;
	ctx;
	character;
	enemies;
	bgLayers = [];
	clouds = [];
	camera;
	level;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.maxWidth = this.sections * this.canvas.width;
		this.character = new Character(this.canvas.width, this.canvas.height);
		this.level = new Level(this.canvas, 4, 5);
		this.bgLayers = this.level.bgLayers;
		this.clouds = this.level.clouds;
		this.enemies = this.level.enemies;
		this.draw();
	}

	draw() {
		const maxCamera = -(this.maxWidth - this.canvas.width);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.camera = -this.character.xPos + this.character.width;
		if (this.camera > 0) this.camera = 0;
		if (this.camera < maxCamera) this.camera = maxCamera;
		this.ctx.translate(this.camera, 0);

		this.addObjectsToMap(this.bgLayers);
		this.addObjectsToMap(this.clouds);
		this.character.draw(this.ctx);
		// this.character.drawFrame(this.ctx);
		this.addObjectsToMap(this.enemies);
		this.ctx.translate(-this.camera, 0);

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
			// object.drawFrame(this.ctx);
		});
	}
}
