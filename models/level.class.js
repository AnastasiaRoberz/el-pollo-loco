import { BackgroundLayer } from "./background.class.js";
import { BossChicken } from "./boss-chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { CollectableBottle } from "./collectable-bottle.class.js";
import { CollectableCoin } from "./collectable-coin.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";
import { World } from "./world.class.js";

export class Level {
	static maxWidth;
	config;
	bgLayers = [];
	clouds = [];
	enemies = [];
	bossChicken;
	bars = {};
	colObjects = { bottles: [], coins: [] };
	lastXPos = 300;

	constructor(levelConfig) {
		this.config = levelConfig;
		Level.maxWidth = this.config.sections * World.canvas.width;
		this.createBgLayers(this.config.sections);
		this.createBottles(this.config.amountBottles);
		this.createCoins(this.config.amountCoins);
		this.bars["healthBar"] = new StatusBar("health", "green", 20, 100, 100);
		this.bars["coinBar"] = new StatusBar("coin", "orange", 70, this.config.amountCoins);
		this.bars["bottleBar"] = new StatusBar("bottle", "blue", 120, this.config.amountBottles);
		this.bars["healthEndboss"] = new StatusBar("healthEndboss", "green", 20, this.config.bossEnergy, 100);
		this.bossChicken = new BossChicken(this.config.bossEnergy, this.config.bossSpeed, this.config.bossDamage);
		this.createEnemies(this.config.enemies, this.config.chickenRatio);
	}

	createBgLayers(sections) {
		const step = World.canvas.width;

		for (let i = 0; i < sections; i++) {
			const imgThirdLayer = ImageHub.BACKGROUND.thirdLayer[i % 2];
			const imgSecondLayer = ImageHub.BACKGROUND.secondLayer[i % 2];
			const imgFirstLayer = ImageHub.BACKGROUND.firstLayer[i % 2];
			const img = ImageHub.BACKGROUND.clouds[i % 2];
			this.bgLayers.push(new BackgroundLayer(ImageHub.BACKGROUND.air, i * step));
			this.bgLayers.push(new BackgroundLayer(imgThirdLayer, i * step));
			this.bgLayers.push(new BackgroundLayer(imgSecondLayer, i * step));
			this.bgLayers.push(new BackgroundLayer(imgFirstLayer, i * step));
			this.clouds.push(new Cloud(img, i * step));
		}
		this.clouds.push(new Cloud(ImageHub.BACKGROUND.clouds[sections % 2], step * sections));
	}

	createEnemies(amount, ratio) {
		const startX = World.canvas.width * 0.5;
		const { step, maxJitter } = this.getSlotParams(amount, startX, Level.maxWidth + World.canvas.width);

		for (let i = 0; i < amount; i++) {
			const slotX = startX + i * step + Math.random() * maxJitter;
			const isSmall = Math.random() < ratio;
			const speedX = this.config.enemySpeedMin + Math.random() * (this.config.enemySpeedMax - this.config.enemySpeedMin);

			this.enemies.push(isSmall ? new SmallChicken(slotX, speedX) : new NormalChicken(slotX, speedX));
		}
	}

	createBottles(amount) {
		const startX = 0;
		const { step, maxJitter } = this.getSlotParams(amount, startX);
		for (let i = 0; i < amount; i++) {
			const slotX = startX + i * step + Math.random() * maxJitter;
			this.colObjects.bottles.push(new CollectableBottle(slotX));
		}
	}

	createCoins(amount) {
		const startX = 300;
		const estClusters = Math.max(1, Math.floor(amount / 4));
		const { step, maxJitter } = this.getSlotParams(estClusters, startX, Level.maxWidth, World.canvas.height);

		let createdCoins = 0;

		for (let i = 0; i < estClusters; i++) {
			if (createdCoins <= amount) {
				const remainingCoins = amount - createdCoins;
				const slotX = startX + i * step + Math.random() * maxJitter;
				const newCoins = CollectableCoin.createCluster(slotX, remainingCoins);
				this.colObjects.coins.push(...newCoins);
				createdCoins += newCoins.length;
			}
		}
	}

	getSlotParams(amount, startX, endX = Level.maxWidth, minDistance = 50) {
		const step = (endX - startX) / amount;
		const maxJitter = Math.max(0, step - minDistance);
		return { step, maxJitter };
	}
}
