import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

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

	constructor(xPos, yPos) {
		super();
		this.initDimensions(xPos, yPos);
		this.loadImg(this.images[0]);
		this.loadImages(this.images);
		this.setRealFrame();
		this.animate();
	}

	initDimensions(xPos, yPos) {
		this.height = World.canvas.height * 0.23;
		this.width = this.height;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	static createCluster(startX, remainingCoins) {
		const keys = Object.keys(this.coinPatterns);
		const randomKey = keys[Math.floor(Math.random() * keys.length)];
		const pattern = this.coinPatterns[randomKey];
		const coinSize = World.canvas.height * 0.23 * 0.4;
		const baseY = World.canvas.height * 0.32;
		const cluster = [];

		for (let i = 0; i < pattern.length; i++) {
			if (cluster.length < remainingCoins) {
				const x = startX + pattern[i][0] * coinSize;
				const y = baseY + pattern[i][1] * coinSize;
				cluster.push(new CollectableCoin(x, y));
			}
		}

		return cluster;
	}
}
