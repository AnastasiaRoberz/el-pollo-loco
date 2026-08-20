import { World } from "./world.class.js";

export class MovableObject {
	img;
	xPos;
	yPos;
	width;
	height;
	imgCache = {};
	currentImage = 0;
	flipDirection = false;
	speed = 0.15;
	isDead = false;
	isHurt = false;
	isAboveGround = false;

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

	/**
	 * @param {string[]} images - Array mit Bildpfaden zu einem Zustand
	 */
	showAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imgCache[path];
		this.currentImage++;
	}

	moveRight() {
		this.xPos += this.speed;
	}

	moveLeft() {
		this.xPos -= this.speed;
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
		ctx.rect(this.xPos, this.yPos, this.width, this.height);
		ctx.stroke();
	}
}
