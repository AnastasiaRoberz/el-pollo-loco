import { BackgroundLayer } from "./background.class.js";
import { Character } from "./character.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./imgHub.class.js";
import { NormalChicken } from "./normalChicken.class.js";

export class World {
	canvas;
	ctx;
	character = new Character();
	enemies = [new NormalChicken(), new NormalChicken(), new NormalChicken()];
	bgLayers = [];
	clouds = [new Cloud(ImageHub.BACKGROUND.clouds[0], 0), new Cloud(ImageHub.BACKGROUND.clouds[1], 720)];
	camera;

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.bgLayers = this.createBgLayers(4);
		this.draw();
	}

	createBgLayers(sections) {
		const layers = [];
		const step = this.canvas.width - 1;

		for (let i = 0; i < sections; i++) {
			layers.push(new BackgroundLayer(ImageHub.Backgrounnd.air, i * step));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.thirdLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.secondLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.firstLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step));
		}

		return layers;
	}

	draw() {
		const maxCamera = -(2800 - 720);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.camera = -this.character.xPos + 100;
		if (this.camera > 0) this.camera = 0;
		if (this.camera < maxCamera) this.camera = maxCamera;
		this.ctx.translate(this.camera, 0);

		this.addObjectsToMap(this.bgLayer);
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
