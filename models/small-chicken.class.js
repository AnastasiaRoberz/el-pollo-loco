import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";
import { World } from "./world.class.js";

export class SmallChicken extends Chicken {
	imagesWalk = ImageHub.SMALL_CHICKEN.walk;
	imgDead = ImageHub.SMALL_CHICKEN.dead;

	constructor() {
		super();
		this.height = World.canvas.height * 0.15;
		this.width = this.height;
		this.yPos = World.canvas.height * 0.88 - this.height;
		this.xPos = World.maxWidth + Math.random() * World.canvas.width;
		this.loadImg(ImageHub.SMALL_CHICKEN.walk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
