import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

export class StatusBar extends DrawableObject {
	xPos;
	width = 250;
	height = 60;
	percentage;
	emptyBarImg;
	iconImg;
	barImg;
	maxValue = 100;

	constructor(icon, color, yPos, maxValue, percentage = 0, xPos = 20) {
		super();
		this.loadAllImages(icon, color);
		this.xPos = xPos;
		this.yPos = yPos;
		this.percentage = percentage;
		this.maxValue = maxValue;
	}

	loadAllImages(icon, color) {
		this.emptyBarImg = new Image();
		this.iconImg = new Image();
		this.barImg = new Image();
		this.emptyBarImg.src = ImageHub.STATUSBAR.barElements.empty;
		this.iconImg.src = ImageHub.STATUSBAR.icons[icon];
		this.barImg.src = ImageHub.STATUSBAR.barElements[color];
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

	setPercentage(value) {
		const calcPercentage = (value / this.maxValue) * 100;
		this.percentage = Math.max(0, Math.min(100, calcPercentage));
	}
}
