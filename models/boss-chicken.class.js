import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";
import { AudioHub } from "../hubs/audio-hub.class.js";

/**
 * Represents the BossChicken game object and extends Chicken.
 */
export class BossChicken extends Chicken {
	isTriggered = false;
	attackAnimationFinished = false;

	/**
	 * Creates and initializes the object.
	 * @param {number} energy - energy value.
	 * @param {number} speedX - speedX value.
	 * @param {number} damage - damage value.
	 */
	constructor(energy, speedX, damage) {
		super();
		this.energy = energy;
		this.speedX = speedX;
		this.damage = damage;
		this.initDimensions();
		this.loadAllImages();
		this.animate();
	}

	/**
	  * Handles init dimensions for the game.
	 */
	initDimensions() {
		this.height = World.canvas.height * 0.85;
		this.width = this.height * 0.85;
		this.yPos = World.canvas.height * 0.92 - this.height;
		this.xPos = Level.maxWidth - this.width * 1.2;
	}

	/**
	  * Handles load all images for the game.
	 */
	loadAllImages() {
		this.offset = ImageHub.BOSS_CHICKEN.walk.offset;
		this.loadImg(ImageHub.BOSS_CHICKEN.walk.frames[0]);
		Object.values(ImageHub.BOSS_CHICKEN).forEach((state) => this.loadImages(state.frames));
	}

	/**
	  * Handles animate for the game.
	 */
	animate() {
		this.movementInterval = IntervalHub.startInterval(() => {
			if (!this.isDead()) this.handleMovement();
		}, 1000 / 60);

		this.animationInterval = IntervalHub.startInterval(() => {
			this.handleAnimations();
		}, 300);
	}

	/**
	  * Handles handle movement for the game.
	 */
	handleMovement() {
		if (this.isAlert()) {
			this.speedX = this.isAttacking() ? 6 : 2;

			if (this.xPos > World.character.xPos + 50) {
				this.flipDirection = false;
				this.moveLeft();
			} else if (this.xPos < World.character.xPos - 50) {
				this.flipDirection = true;
				this.moveRight();
			}
		}
	}

	/**
	  * Handles handle animations for the game.
	 */
	handleAnimations() {
		if (this.isDead()) return this.startDeathSequence();
		const state = this.getAnimationState();
		if (state === ImageHub.BOSS_CHICKEN.attack) {
			this.offset = state.offset;
			this.showAnimationOnce(state.frames);
			if (this.currentImage >= state.frames.length) this.attackAnimationFinished = true;
			return;
		}
		if (!this.isAttacking()) this.attackAnimationFinished = false;
		this.showStateAnimation(state);
	}

	/**
	  * Handles get animation state for the game.
	 */
	getAnimationState() {
		if (this.isHurt()) return ImageHub.BOSS_CHICKEN.hurt;
		if (this.isAttacking() && !this.attackAnimationFinished) return ImageHub.BOSS_CHICKEN.attack;
		if (this.isMoving()) return ImageHub.BOSS_CHICKEN.walk;
		if (this.isAlert()) return ImageHub.BOSS_CHICKEN.alert;
		return ImageHub.BOSS_CHICKEN.walk;
	}

	/**
	  * Handles show state animation for the game.
	 * @param {Object} state - state value.
	 */
	showStateAnimation(state) {
		this.offset = state.offset;
		this.showAnimation(state.frames);
	}

	/**
	  * Handles start death sequence for the game.
	 */
	startDeathSequence() {
		this.stopBossIntervals();
		this.showAnimationOnce(ImageHub.BOSS_CHICKEN.dead.frames || ImageHub.BOSS_CHICKEN.dead);
		this.startDeathFall();
	}

	/**
	  * Handles stop boss intervals for the game.
	 */
	stopBossIntervals() {
		IntervalHub.stopInterval(this.movementInterval || "boss-chicken-movement");
		IntervalHub.stopInterval(this.animationInterval || "boss-chicken-animate");
	}

	/**
	  * Handles start death fall for the game.
	 */
	startDeathFall() {
		let bossDropSpeed = 10;
		const gravity = 1.0;

		IntervalHub.startInterval(() => {
			this.yPos -= bossDropSpeed;
			bossDropSpeed -= gravity;
		}, 1000 / 40);
	}

	/**
	  * Handles get distance for the game.
	 */
	getDistance() {
		return Math.abs(this.xPos - World.character.xPos);
	}

	/**
	  * Handles is alert for the game.
	 */
	isAlert() {
		if (this.getDistance() < World.canvas.width * 0.8) {
			this.isTriggered = true;
			AudioHub.playOne(AudioHub.ENDBOSS_APPROACH);
		}
		return this.isTriggered;
	}

	/**
	  * Handles is attacking for the game.
	 */
	isAttacking() {
		return this.getDistance() <= 180;
	}

	/**
	  * Handles is moving for the game.
	 */
	isMoving() {
		return this.isAlert() && !this.isAttacking();
	}
}
