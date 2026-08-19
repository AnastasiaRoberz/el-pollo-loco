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
		this.canvas = canvas;
		this.bgImg = new Image();
		this.bgImg.src = "../assets/img/5_background/layers/air.png";
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(this.bgImg, 0, 0, 720, 480);
		this.addObjectsToMap(this.bgLayer);
		this.addItemToMap(this.clouds);
		this.addItemToMap(this.character);
		this.addObjectsToMap(this.enemies);

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => this.addItemToMap(object));
	}

	addItemToMap(item) {
		this.ctx.drawImage(item.img, item.xPos, item.yPos, item.width, item.height);
	}
}
