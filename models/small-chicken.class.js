import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class SmallChicken extends Chicken {
	imagesWalk = ImageHub.SMALL_CHICKEN.walk.frames;
	imgDead = ImageHub.SMALL_CHICKEN.dead.frame;
	offset = { topRatio: 0.08, bottomRatio: 0.08, leftRatio: 0.15, rightRatio: 0.08 };

	constructor() {
		super();
		this.height = World.canvas.height * 0.15;
		this.width = this.height;
		this.yPos = World.canvas.height * 0.88 - this.height;
		this.xPos = Level.maxWidth + Math.random() * World.canvas.width;
		this.loadImg(this.imagesWalk[0]);
		this.loadImages(this.imagesWalk);
		this.setRealFrame();
		this.animate();
	}
}
