import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

export class StatusBar extends DrawableObject {
	xPos = World.canvas.width * 0.02;
	width = 250;
	height = 60;
	percentage;
	emptyBarImg;
	iconImg;
	barImg;
	maxValue = 100;

	constructor(icon, color, yPos, maxValue, percentage = 0) {
		super();
		this.loadAllImages(icon, color);
		if (icon === "healthEndboss") this.xPos = World.canvas.width - World.canvas.width * 0.02 - this.width;
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
		const barX = this.xPos + barOffsetX;

		ctx.drawImage(this.emptyBarImg, barX, this.yPos, barWidth, this.height);
		this.drawFilledBar(ctx, barX, this.yPos, barWidth, this.height);
		ctx.drawImage(this.iconImg, this.xPos, this.yPos, iconSize, iconSize);
	}

	drawFilledBar(ctx, xPos, yPos, width, height) {
		const fillWidth = width * (this.percentage / 100);
		if (fillWidth <= 0) return;
		this.drawBarImage(ctx, xPos, yPos, fillWidth, height);
	}

	drawBarImage(ctx, xPos, yPos, fillWidth, height) {
		ctx.drawImage(
			this.barImg,
			0,
			0,
			this.barImg.width * (this.percentage / 100),
			this.barImg.height,
			xPos,
			yPos,
			fillWidth,
			height,
		);
	}

	setPercentage(value) {
		const calcPercentage = (value / this.maxValue) * 100;
		this.percentage = Math.max(0, Math.min(100, calcPercentage));
	}
}
