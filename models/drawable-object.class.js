import { ImageHub } from "./img-hub.class.js";

export class DrawableObject {
	xPos;
	yPos;
	defaultYPos;
	width;
	height;
	img;
	imgCache = {};
	currentImage = 0;

	constructor() {
		this.loadImages(ImageHub.INTRO_OUTRO_SCREENS.won);
		this.loadImages(ImageHub.INTRO_OUTRO_SCREENS.lost);
	}

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
}
