import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";

export class SmallChicken extends Chicken {
	imagesWalk = ImageHub.SMALL_CHICKEN.walk;

	constructor(canvasHeight, maxWidth) {
		super();
		this.height = canvasHeight * 0.1;
		this.width = this.height;
		this.yPos = canvasHeight * 0.88 - this.height;
		this.xPos = Math.random() * maxWidth;
		this.loadImg(ImageHub.SMALL_CHICKEN.walk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
