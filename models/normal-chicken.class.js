import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./img-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class NormalChicken extends Chicken {
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk;
	imgDead = ImageHub.NORMAL_CHICKEN.dead;

	constructor(xPos, speedX) {
		super();
		this.xPos = xPos;
		this.speedX = speedX;
		this.height = World.canvas.height * 0.18;
		this.width = this.height;
		this.yPos = World.canvas.height * 0.88 - this.height;
		this.loadImg(this.imagesWalk[0]);
		this.loadImages(this.imagesWalk);
		this.animate();
	}
}
