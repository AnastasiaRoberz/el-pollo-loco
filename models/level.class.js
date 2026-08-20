import { BackgroundLayer } from "./background.class.js";
import { BossChicken } from "./bossChicken.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./imgHub.class.js";
import { NormalChicken } from "./normalChicken.class.js";

export class Level {
	maxWidth;
	bgLayers;
	clouds;
	enemies;

	constructor(canvas, sections, enemiesAmount) {
		this.maxWidth = sections * canvas.width;
		this.createBgLayers(canvas, sections);
		this.createClouds(canvas, sections);
		this.createEnemies(canvas, sections, enemiesAmount);
	}

	createBgLayers(canvas, sections) {
		const layers = [];
		const step = canvas.width;

		for (let i = 0; i < sections; i++) {
			layers.push(new BackgroundLayer(ImageHub.BACKGROUND.air, i * step, canvas.width, canvas.height));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.thirdLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, canvas.width, canvas.height));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.secondLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, canvas.width, canvas.height));
		}

		for (let i = 0; i < sections; i++) {
			const img = ImageHub.BACKGROUND.firstLayer[i % 2];
			layers.push(new BackgroundLayer(img, i * step, canvas.width, canvas.height));
		}

		this.bgLayers = layers;
	}

	createClouds(canvas, sections) {
		const cloudsArr = [];
		const step = canvas.width;

		for (let i = 0; i <= sections; i++) {
			const img = ImageHub.BACKGROUND.clouds[i % 2];
			cloudsArr.push(new Cloud(img, i * step, canvas.width, canvas.height));
		}

		this.clouds = cloudsArr;
	}

	createEnemies(canvas, enemiesAmount) {
		const chickens = [];
		for (let i = 0; i < enemiesAmount; i++) {
			chickens.push(new NormalChicken(canvas.height, this.maxWidth));
		}
		chickens.push(new BossChicken(canvas.height, this.maxWidth));
		this.enemies = chickens;
	}
}
