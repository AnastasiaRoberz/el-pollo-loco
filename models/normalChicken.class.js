import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./imgHub.class.js";

export class NormalChicken extends Chicken {
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk;

	constructor(canvasWidth, canvasHeight) {
		super();
		this.height = canvasHeight * 0.3;
		this.width = this.height;
		this.yPos = canvasHeight * 0.8 - this.height;
		this.xPos = this.loadImg(ImageHub.NORMAL_CHICKEN.walk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
