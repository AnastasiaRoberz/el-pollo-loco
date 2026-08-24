import { BackgroundLayer } from "./background.class.js";
import { BossChicken } from "./boss-chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";

export class Level {
	maxWidth;
	bgLayers;
	clouds;
	enemies = [];
	healthBar;
	coinBar;
	bottleBar;

	constructor(canvas, sections) {
		this.maxWidth = sections * canvas.width;
		this.createBgLayers(canvas, sections);
		this.createClouds(canvas, sections);
		this.healthBar = new StatusBar("health", "green", 20);
		this.coinBar = new StatusBar("coin", "orange", 80);
		this.bottleBar = new StatusBar("bottle", "blue", 140);
		this.enemies.push(new BossChicken(canvas.height, this.maxWidth));
		this.addStartEnemies(canvas);
		// this.addEnemies();
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

	addStartEnemies(canvas) {
		for (let i = 0; i < 5; i++) {
			this.enemies.push(new NormalChicken(canvas.width, canvas.height, canvas.width));
			this.enemies.push(new SmallChicken(canvas.width, canvas.height, canvas.width));
		}
	}

	addEnemies() {
		IntervalHub.startInterval(
			"add-normal-chicken",
			() => {
				this.enemies.push(new NormalChicken(canvas.width, canvas.height, this.maxWidth));
			},
			4000,
		);

		IntervalHub.startInterval(
			"add-small-chicken",
			() => {
				this.enemies.push(new SmallChicken(canvas.width, canvas.height, this.maxWidth));
			},
			2000,
		);
	}
}
