import { BackgroundLayer } from "./background.class.js";
import { BossChicken } from "./boss-chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { CollectableBottle } from "./collectable-bottle.class.js";
import { CollectableCoin } from "./collectable-coin.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { LevelHub } from "./level-hub.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";
import { World } from "./world.class.js";

export class Level {
	static maxWidth;
	bgLayers;
	clouds = [];
	enemies = [];
	bars = {};
	colObjects = { bottles: [], coins: [] };

	constructor(sections) {
		Level.maxWidth = sections * World.canvas.width;
		this.createBgLayers(sections);
		this.createClouds(sections);
		this.createColObjects();
		this.bars["healthBar"] = new StatusBar("health", "green", 20);
		this.bars["coinBar"] = new StatusBar("coin", "orange", 70);
		this.bars["bottleBar"] = new StatusBar("bottle", "blue", 120);
		this.enemies.push(new BossChicken());
		this.addStartEnemies();
		// this.addEnemies();
	}

	createBgLayers(sections) {
		const layers = [];
		const step = World.canvas.width;

		for (let i = 0; i < sections; i++) {
			const imgThirdLayer = ImageHub.BACKGROUND.thirdLayer[i % 2];
			const imgSecondLayer = ImageHub.BACKGROUND.secondLayer[i % 2];
			const imgFirstLayer = ImageHub.BACKGROUND.firstLayer[i % 2];
			layers.push(new BackgroundLayer(ImageHub.BACKGROUND.air, i * step));
			layers.push(new BackgroundLayer(imgThirdLayer, i * step));
			layers.push(new BackgroundLayer(imgSecondLayer, i * step));
			layers.push(new BackgroundLayer(imgFirstLayer, i * step));
		}
		this.bgLayers = layers;
	}

	createClouds(sections) {
		const step = World.canvas.width;

		for (let i = 0; i <= sections; i++) {
			const img = ImageHub.BACKGROUND.clouds[i % 2];
			this.clouds.push(new Cloud(img, i * step));
		}
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

	createColObjects() {
		for (let i = 0; i < 3; i++) {
			this.colObjects.bottles.push(new CollectableBottle());
		}

		// for (let i = 0; i < 20; i++) {
		// 	this.colObjects.coins.push(new CollectableCoin());
		// }
	}
}
