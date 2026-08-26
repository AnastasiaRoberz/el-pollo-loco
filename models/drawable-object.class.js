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
	currentState = null;
	id;

	offset = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

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

	setOffset(state) {
		if (this.offset[state]) this.offset = this.offset[state];
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
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(
			this.xPos + this.offset.left,
			this.yPos + this.offset.top,
			this.width - this.offset.left - this.offset.right,
			this.height - this.offset.top - this.offset.bottom,
		);
		ctx.stroke();
	}
}
