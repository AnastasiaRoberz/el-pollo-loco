import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

export class StatusBar extends DrawableObject {
	xPos = 20;
	yPos;
	width = 250;
	height = 60;
	percentage = 0;
	emptyBarImg;
	iconImg;
	barImg;

	constructor(icon, color, yPos) {
		super();
		this.emptyBarImg = new Image();
		this.emptyBarImg.src = ImageHub.STATUSBAR.barElements.empty;
		this.iconImg = new Image();
		this.iconImg.src = ImageHub.STATUSBAR.icons[icon];
		this.barImg = new Image();
		this.barImg.src = ImageHub.STATUSBAR.barElements[color];
		this.yPos = yPos;
		if (icon === "health") this.setPercentage(100);
		if (icon === "healthEndboss") {
			this.xPos = World.canvas.width - this.width - 20;
			this.setPercentage(100);
		}
	}

	draw(ctx) {
		const iconSize = this.height;
		const barOffsetX = iconSize * 0.3;
		const barWidth = this.width - barOffsetX;
		const currentFillWidth = barWidth * (this.percentage / 100);

		ctx.drawImage(this.emptyBarImg, this.xPos + barOffsetX, this.yPos, barWidth, this.height);
		if (currentFillWidth > 0) {
			ctx.drawImage(
				this.barImg,
				0,
				0,
				this.barImg.width * (this.percentage / 100),
				this.barImg.height,
				this.xPos + barOffsetX,
				this.yPos,
				currentFillWidth,
				this.height,
			);
		}
		ctx.drawImage(this.iconImg, this.xPos, this.yPos, iconSize, iconSize);
	}

	setPercentage(percentage) {
		this.percentage = Math.max(0, Math.min(100, percentage));
	}
}
