import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./imgHub.class.js";

export class NormalChicken extends Chicken {
	yPos = 530;
	width = 102;
	height = 100;
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk;

	constructor() {
		super();
		this.loadImg(ImageHub.NORMAL_CHICKEN.walk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
