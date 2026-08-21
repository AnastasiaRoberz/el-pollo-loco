import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";

export class BossChicken extends Chicken {
	constructor(canvasHeight, maxWidth) {
		super();
		this.height = canvasHeight * 0.85;
		this.width = this.height * 0.85;
		this.yPos = canvasHeight * 0.92 - this.height;
		this.xPos = maxWidth - this.width * 1.2;
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
		setInterval(() => {
			this.showAnimation(ImageHub.BOSS_CHICKEN.alert);
		}, 300);
	}
}
