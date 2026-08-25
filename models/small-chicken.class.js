import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";

export class SmallChicken extends Chicken {
	imagesWalk = ImageHub.SMALL_CHICKEN.walk;
	imgDead = ImageHub.SMALL_CHICKEN.dead;

	constructor(canvasWidth, canvasHeight, maxWidth) {
		super();
		this.height = canvasHeight * 0.15;
		this.width = this.height;
		this.yPos = canvasHeight * 0.88 - this.height;
		this.xPos = maxWidth + Math.random() * canvasWidth;
		this.loadImg(ImageHub.SMALL_CHICKEN.walk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
