import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class BossChicken extends Chicken {
	isTriggered = false;

	constructor(energy, speedX, damage) {
		super();
		this.energy = energy;
		this.speedX = speedX;
		this.damage = damage;
		this.height = World.canvas.height * 0.85;
		this.width = this.height * 0.85;
		this.yPos = World.canvas.height * 0.92 - this.height;
		this.xPos = Level.maxWidth - this.width * 1.2;
		this.loadImg(ImageHub.BOSS_CHICKEN.walk[0]);
		this.loadImagesToCache();
		this.animate();
	}

	loadImagesToCache() {
		this.loadImages(ImageHub.BOSS_CHICKEN.walk.frames);
		this.loadImages(ImageHub.BOSS_CHICKEN.alert.frames);
		this.loadImages(ImageHub.BOSS_CHICKEN.attack.frames);
		this.loadImages(ImageHub.BOSS_CHICKEN.hurt.frames);
		this.loadImages(ImageHub.BOSS_CHICKEN.dead.frames);
	}

	animate() {
		IntervalHub.startInterval(
			"boss_chicken_movement",
			() => {
				if (!this.isDead()) this.handleMovement();
			},
			1000 / 60,
		);

		IntervalHub.startInterval(
			"boss-chicken-animate",
			() => {
				this.handleAnimations();
			},
			300,
		);
	}

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

	handleAnimations() {
		if (this.isDead()) {
			this.showAnimationOnce(ImageHub.BOSS_CHICKEN.dead.frames);
		} else if (this.isHurt()) {
			this.showAnimation(ImageHub.BOSS_CHICKEN.hurt.frames);
		} else if (this.isAttacking()) {
			this.showAnimationOnce(ImageHub.BOSS_CHICKEN.attack.frames);
		} else if (this.isMoving()) {
			this.showAnimation(ImageHub.BOSS_CHICKEN.walk.frames);
		} else if (this.isAlert()) {
			this.showAnimation(ImageHub.BOSS_CHICKEN.alert.frames);
		} else {
			this.showAnimation(ImageHub.BOSS_CHICKEN.alert.frames);
		}
	}

	getDistance() {
		return Math.abs(this.xPos - World.character.xPos);
	}

	isAlert() {
		if (this.getDistance() < 650) this.isTriggered = true;
		return this.isTriggered;
	}

	isAttacking() {
		return this.getDistance() <= 180;
	}

	isMoving() {
		return this.isAlert() && !this.isAttacking();
	}
}
