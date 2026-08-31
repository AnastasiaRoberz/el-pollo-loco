import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

export class NormalChicken extends Chicken {
	imagesWalk = ImageHub.NORMAL_CHICKEN.walk.frames;
	imgDead = ImageHub.NORMAL_CHICKEN.dead.frame;
	offset = { topRatio: 0.06, bottomRatio: 0.02, leftRatio: 0.02, rightRatio: 0.03 };

	constructor(xPos, speedX) {
		super();
		this.xPos = xPos;
		this.speedX = speedX;
		this.height = World.canvas.height * 0.18;
		this.width = this.height;
		this.yPos = World.canvas.height * 0.88 - this.height;
		this.loadImg(this.imagesWalk[0]);
		this.loadImages(this.imagesWalk);
		this.setRealFrame();
		this.animate();
	}
}
