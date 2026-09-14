import { AudioHub } from "../hubs/audio-hub.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

/**
 * Represents the ThrowableObject game object and extends MovableObject.
 */
export class ThrowableObject extends MovableObject {
	speedY = 30;
	speedX = 20;
	hasHit = false;
	offset = { topRatio: 0.16, bottomRatio: 0.13, leftRatio: 0.14, rightRatio: 0.14 };
	soundPlayed = false;

	/**
	 * Creates and initializes the object.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 * @param {boolean} flipDirection - flipDirection value.
	 */
	constructor(xPos, yPos, flipDirection) {
		super();
		this.initDimensions(xPos, yPos);
		this.loadAllImages();
		this.applyGravity();
		this.throw(flipDirection);
	}

	/**
	  * Handles init dimensions for the game.
	 * @param {number} xPos - xPos value.
	 * @param {number} yPos - yPos value.
	 */
	initDimensions(xPos, yPos) {
		this.height = World.canvas.height * 0.12;
		this.width = this.height;
		this.yPos = yPos;
		this.xPos = xPos;
		this.yPosGround = World.canvas.height * 0.86 - this.height + this.offset.bottomRatio * this.height;
	}

	/**
	  * Handles load all images for the game.
	 */
	loadAllImages() {
		this.loadImg(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.loadImages(ImageHub.BOTTLE.splash);
	}

	/**
	  * Handles throw for the game.
	 * @param {boolean} flipDirection - flipDirection value.
	 */
	throw(flipDirection) {
		this.animationInterval = IntervalHub.startInterval(() => {
			if (this.bottleHitGround() || this.hasHit) {
				this.handleBottleImpact();
			} else {
				this.moveBottle(flipDirection);
			}
		}, 50);
	}

	/**
	  * Handles handle bottle impact for the game.
	 */
	handleBottleImpact() {
		IntervalHub.stopInterval(this.gravityInterval);
		if (!this.soundPlayed) {
			this.soundPlayed = true;
			AudioHub.playOne(AudioHub.BOTTLE_BREAK);
		}
		this.showAnimationOnce(ImageHub.BOTTLE.splash);
		setTimeout(() => {
			IntervalHub.stopInterval(this.animationInterval);
		}, 1000);
	}

	/**
	  * Handles move bottle for the game.
	 * @param {boolean} flipDirection - flipDirection value.
	 */
	moveBottle(flipDirection) {
		const images = flipDirection ? ImageHub.BOTTLE.reverseRotation : ImageHub.BOTTLE.rotation;
		this.showAnimation(images);
		this.xPos += flipDirection ? -this.speedX : this.speedX;
	}

	/**
	  * Handles is above ground for the game.
	 */
	isAboveGround() {
		return true;
	}

	/**
	  * Handles bottle hit ground for the game.
	 */
	bottleHitGround() {
		return this.yPos >= this.yPosGround;
	}
}
