import { BackgroundLayer } from "./background.class.js";
import { Character } from "./character.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./imgHub.class.js";
import { NormalChicken } from "./normalChicken.class.js";

export class World {
	static maxWidth;
	canvas;
	ctx;
	character;
	enemies = [new NormalChicken(), new NormalChicken(), new NormalChicken()];
	bgLayers = [];
	clouds = [];
	camera;
	sections = 2;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		World.maxWidth = this.sections * this.canvas.width;
		this.character = new Character(this.canvas.width, this.canvas.height);
		this.bgLayers = this.createBgLayers();
		this.clouds = this.createClouds();
		this.draw();
	}

	createBgLayers() {
		const layers = [];
		const step = this.canvas.width;

		for (let i = 0; i < this.sections; i++) {
			layers.push(new BackgroundLayer(ImageHub.BACKGROUND.air, i * step, this.canvas.width, this.canvas.height));
		}

		for (let i = 0; i < this.sections; i++) {
			const img = ImageHub.BACKGROUND.thirdLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, this.canvas.width, this.canvas.height));
		}

		for (let i = 0; i < this.sections; i++) {
			const img = ImageHub.BACKGROUND.secondLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, this.canvas.width, this.canvas.height));
		}

		for (let i = 0; i < this.sections; i++) {
			const img = ImageHub.BACKGROUND.firstLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, this.canvas.width, this.canvas.height));
		}

		return layers;
	}

	createClouds() {
		const cloudsArr = [];
		const step = this.canvas.width;

		for (let i = 0; i < this.sections; i++) {
			const img = ImageHub.BACKGROUND.clouds[i % 2];
			cloudsArr.push(new Cloud(img, i * step, this.canvas.width, this.canvas.height));
		}

		return cloudsArr;
	}

	draw() {
		const maxCamera = -(World.maxWidth - this.canvas.width);
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
