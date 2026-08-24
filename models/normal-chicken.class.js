import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";

export class NormalChicken extends Chicken {
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk;
	imgDead = ImageHub.NORMAL_CHICKEN.dead;

	constructor(canvasWidth, canvasHeight, maxWidth) {
		super();
		this.height = canvasHeight * 0.18;
		this.width = this.height;
		this.yPos = canvasHeight * 0.88 - this.height;
		this.xPos = maxWidth + Math.random() * canvasWidth;
		this.loadImg(this.imagesWalk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
