import { ImageHub } from "../hubs/img-hub.class.js";
import { World } from "./world.class.js";

export class DrawableObject {
	xPos;
	yPos;
	defaultYPos;
	width;
	height;
	img;
	imgCache = {};
	currentImage = 0;
	currentState = null;
	offset = { topRatio: 0, bottomRatio: 0, leftRatio: 0, rightRatio: 0 };
	rxPos;
	ryPos;
	rWidth;
	rHeight;

	loadImg(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * @param {string[]} images - Array mit Bildpfaden zu einem Zustand
	 */
	loadImages(images) {
		images.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imgCache[path] = img;
		});
	}

	setRealFrame() {
		this.rxPos = this.xPos + this.offset.leftRatio * this.width;
		this.ryPos = this.yPos + this.offset.topRatio * this.height;
		this.rWidth = this.width - this.offset.leftRatio * this.width - this.offset.rightRatio * this.width;
		this.rHeight = this.height - this.offset.topRatio * this.height - this.offset.bottomRatio * this.height;
	}

	/**
	 * @param {string[]} images - Array mit Bildpfaden zu einem Zustand
	 */
	showAnimation(images) {
		if (this.currentState !== images) {
			this.currentState = images;
			this.currentImage = 0;
		}

		const i = this.currentImage % images.length;
		this.img = this.imgCache[images[i]];
		this.currentImage++;
	}

	showAnimationOnce(images) {
		if (this.currentState !== images) {
			this.currentState = images;
			this.currentImage = 0;
		}
		if (this.currentImage < images.length) {
			const path = images[this.currentImage];
			this.img = this.imgCache[path];
			this.currentImage++;
		} else {
			const lastPath = images[images.length - 1];
			this.img = this.imgCache[lastPath];
		}
	}

	draw(ctx) {
		if (this.flipDirection) {
			ctx.save();
			ctx.translate(this.xPos + this.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(this.img, 0, this.yPos, this.width, this.height);
			ctx.restore();
		} else {
			ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);
		}
	}

	drawFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "blue";
		ctx.rect(this.xPos, this.yPos, this.width, this.height);
		ctx.stroke();
	}

	drawOffsetFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "red";
		ctx.rect(this.rxPos, this.ryPos, this.rWidth, this.rHeight);
		ctx.stroke();
	}
}
