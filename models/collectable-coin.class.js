import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

/**
 * Represents the CollectableCoin game object and extends CollectableObject.
 */
export class CollectableCoin extends CollectableObject {
	images = ImageHub.COIN;
	offset = { topRatio: 0.35, bottomRatio: 0.35, leftRatio: 0.35, rightRatio: 0.35 };
	static coinPatterns = {
		arch: [
			[0, 0],
			[1, -1],
			[2, -2],
			[3, -1],
			[4, 0],
		],
		triangle: [
			[0, 0],
			[1, -1],
			[2, 0],
		],
		line: [
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		],
		diagonal: [
			[0, 0],
			[1, -1],
			[2, -2],
		],
	};

	/**
	 * Creates and initializes the object.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 */
	constructor(xPos, yPos) {
		super();
		this.initDimensions(xPos, yPos);
		this.loadImg(this.images[0]);
		this.loadImages(this.images);
		this.animate();
	}

	/**
	  * Handles init dimensions for the game.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 */
	initDimensions(xPos, yPos) {
		this.height = World.canvas.height * 0.23;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	/**
	  * Handles create cluster for the game.
	 * @param {number} startX - startX value.
	 * @param {number} remainingCoins - remainingCoins value.
	 */
	static createCluster(startX, remainingCoins) {
		const keys = Object.keys(this.coinPatterns);
		const randomKey = keys[Math.floor(Math.random() * keys.length)];
		const pattern = this.coinPatterns[randomKey];
		const coinSize = World.canvas.height * 0.23 * 0.38;
		const baseY = World.canvas.height * 0.38;
		const cluster = [];

		for (let i = 0; i < pattern.length && cluster.length < remainingCoins; i++) {
			cluster.push(this.createCoin(startX, coinSize, pattern[i], baseY));
		}

		return cluster;
	}

	/**
	  * Handles create coin for the game.
	 * @param {number} startX - startX value.
	 * @param {number} coinSize - coinSize value.
	 * @param {Object} position - position value.
	 * @param {number} baseY - baseY value.
	 */
	static createCoin(startX, coinSize, position, baseY) {
		const x = startX + position[0] * coinSize;
		const y = baseY + position[1] * coinSize;
		return new CollectableCoin(x, y);
	}
}
