import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

/**
 * Represents the StatusBar game object and extends DrawableObject.
 */
export class StatusBar extends DrawableObject {
	xPos = World.canvas.width * 0.02;
	width = 250;
	height = 60;
	percentage;
	emptyBarImg;
	iconImg;
	barImg;
	maxValue = 100;

	/**
	 * Creates and initializes the object.
	 * @param {string} icon - icon value.
	 * @param {string} color - color value.
	 * @param {number} yPos - yPos value.
	 * @param {number} maxValue - maxValue value.
	 * @param {number} percentage - percentage value.
	 */
	constructor(icon, color, yPos, maxValue, percentage = 0) {
		super();
		this.loadAllImages(icon, color);
		if (icon === "healthEndboss") this.xPos = World.canvas.width - World.canvas.width * 0.02 - this.width;
		this.yPos = yPos;
		this.percentage = percentage;
		this.maxValue = maxValue;
	}

	/**
	 * Handles load all images for the game.
	 * @param {string} icon - icon value.
	 * @param {string} color - color value.
	 */
	loadAllImages(icon, color) {
		this.emptyBarImg = new Image();
		this.iconImg = new Image();
		this.barImg = new Image();
		this.emptyBarImg.src = ImageHub.STATUSBAR.barElements.empty;
		this.iconImg.src = ImageHub.STATUSBAR.icons[icon];
		this.barImg.src = ImageHub.STATUSBAR.barElements[color];
	}

	/**
	 * Handles draw for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 */
	draw(ctx) {
		const iconSize = this.height;
		const emptyBarOffsetX = iconSize * 0.3;
		const emptyBarWidth = this.width - emptyBarOffsetX;
		const emptyBarX = this.xPos + emptyBarOffsetX;

		ctx.drawImage(this.emptyBarImg, emptyBarX, this.yPos, emptyBarWidth, this.height);
		this.drawFilledBar(ctx, emptyBarX, this.yPos, emptyBarWidth, this.height, iconSize - emptyBarOffsetX);
		ctx.drawImage(this.iconImg, this.xPos, this.yPos, iconSize, iconSize);
	}

	/**
	 * Handles draw filled bar for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 * @param {number} width - width value.
	 * @param {number} height - height value.
	 * @param {number} firstFillWidth - firstFillWidth value.
	 */
	drawFilledBar(ctx, xPos, yPos, width, height, firstFillWidth) {
		let fillWidth = width * (this.percentage / 100);
		if (this.percentage > 0) fillWidth = Math.max(fillWidth, firstFillWidth);
		fillWidth = Math.min(fillWidth, width);
		if (fillWidth <= 0) return;
		this.drawBarImage(ctx, xPos, yPos, fillWidth, width, height);
	}

	/**
	 * Handles draw bar image for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 * @param {number} fillWidth - fillWidth value.
	 * @param {number} barWidth - barWidth value.
	 * @param {number} height - height value.
	 */
	drawBarImage(ctx, xPos, yPos, fillWidth, barWidth, height) {
		const sourceWidth = this.barImg.width * (fillWidth / barWidth);
		ctx.drawImage(this.barImg, 0, 0, sourceWidth, this.barImg.height, xPos, yPos, fillWidth, height);
	}

	/**
	 * Handles set percentage for the game.
	 * @param {boolean} value - value value.
	 */
	setPercentage(value) {
		const calcPercentage = (value / this.maxValue) * 100;
		this.percentage = Math.max(0, Math.min(100, calcPercentage));
	}
}
