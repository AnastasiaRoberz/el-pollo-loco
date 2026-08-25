import { BackgroundLayer } from "./background.class.js";
import { BossChicken } from "./boss-chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";
import { World } from "./world.class.js";

export class Level {
	maxWidth;
	bgLayers;
	clouds;
	enemies = [];
	healthBar;
	coinBar;
	bottleBar;

	constructor(sections) {
		this.maxWidth = sections * World.canvas.width;
		this.createBgLayers(sections);
		this.createClouds(sections);
		this.healthBar = new StatusBar("health", "green", 20);
		this.coinBar = new StatusBar("coin", "orange", 70);
		this.bottleBar = new StatusBar("bottle", "blue", 120);
		this.enemies.push(new BossChicken());
		this.addStartEnemies();
		// this.addEnemies();
	}

	createBgLayers(sections) {
		const layers = [];
		const step = World.canvas.width;

		for (let i = 0; i < sections; i++) {
			layers.push(new BackgroundLayer(ImageHub.BACKGROUND.air, i * step));
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

		this.bgLayers = layers;
	}

	createClouds(sections) {
		const cloudsArr = [];
		const step = World.canvas.width;

		for (let i = 0; i <= sections; i++) {
			const img = ImageHub.BACKGROUND.clouds[i % 2];
			cloudsArr.push(new Cloud(img, i * step));
		}

		this.clouds = cloudsArr;
	}

	addStartEnemies() {
		for (let i = 0; i < 5; i++) {
			this.enemies.push(new NormalChicken());
			this.enemies.push(new SmallChicken());
		}
	}

	addEnemies() {
		IntervalHub.startInterval(
			"add-normal-chicken",
			() => {
				this.enemies.push(new NormalChicken());
			},
			4000,
		);

		IntervalHub.startInterval(
			"add-small-chicken",
			() => {
				this.enemies.push(new SmallChicken());
			},
			2000,
		);
	}
}
