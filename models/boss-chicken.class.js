import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { World } from "./world.class.js";

export class BossChicken extends Chicken {
	constructor() {
		super();
		this.height = World.canvas.height * 0.85;
		this.width = this.height * 0.85;
		this.yPos = World.canvas.height * 0.92 - this.height;
		this.xPos = World.maxWidth - this.width * 1.2;
		this.loadImg(ImageHub.BOSS_CHICKEN.walk[0]);
		this.loadImagesToCache();
		this.animate();
	}

	loadImagesToCache() {
		this.loadImages(ImageHub.BOSS_CHICKEN.walk);
		this.loadImages(ImageHub.BOSS_CHICKEN.alert);
		this.loadImages(ImageHub.BOSS_CHICKEN.attack);
		this.loadImages(ImageHub.BOSS_CHICKEN.hurt);
		this.loadImages(ImageHub.BOSS_CHICKEN.dead);
	}

	animate() {
		IntervalHub.startInterval(
			"bos-chicken-animate",
			() => {
				this.showAnimation(ImageHub.BOSS_CHICKEN.alert);
			},
			300,
		);
	}
}
