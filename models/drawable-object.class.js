/**
 * Represents the DrawableObject game object.
 */
export class DrawableObject {
	xPos = 0;
	yPos = 0;
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
	yPosGround;
	flipDirection = false;

	/**
	  * Handles load img for the game.
	 * @param {string} path - path value.
	 */
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
	  * Handles set real frame for the game.
	 */
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

	/**
	  * Handles show animation once for the game.
	 * @param {string[]} images - images value.
	 */
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

	/**
	  * Handles draw for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 */
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

	/**
	  * Handles draw frame for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 */
	drawFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "blue";
		ctx.rect(this.xPos, this.yPos, this.width, this.height);
		ctx.stroke();
	}

	/**
	  * Handles draw offset frame for the game.
	 * @param {CanvasRenderingContext2D} ctx - ctx value.
	 */
	drawOffsetFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "red";
		ctx.rect(this.rxPos, this.ryPos, this.rWidth, this.rHeight);
		ctx.stroke();
	}
}
