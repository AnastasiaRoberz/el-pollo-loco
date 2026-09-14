import { Character } from "./character.class.js";
import { IntervalHub } from "../hubs/interval-hub.class.js";
import { Keyboard } from "./keyboard.class.js";
import { LevelHub } from "../hubs/level-hub.class.js";
import { Level } from "./level.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { AudioHub } from "../hubs/audio-hub.class.js";
import { ImageHub } from "../hubs/img-hub.class.js";

/**
 * Represents the World game object.
 */
export class World {
	static canvas;
	static character;
	ctx;
	throwableObjects = [];
	cameraPos;
	maxCameraPos;
	level;
	gameOver = false;
	endScreen;
	collectedBottles = 0;
	collectedCoins = 0;
	lastThrow = 0;
	throwCooldown = 400;

	/**
	 * Creates and initializes the object.
	 * @param {*} canvas - canvas value.
	 * @param {Function} endScreen - endScreen value.
	 * @param {string} difficulty - difficulty value.
	 */
	constructor(canvas, endScreen, difficulty) {
		World.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		World.character = new Character();
		this.level = new Level(LevelHub[`LEVEL_${difficulty}`]);
		this.endScreen = endScreen;
		Keyboard.init();
		this.maxCameraPos = -(Level.maxWidth - World.canvas.width);
		this.draw();
		this.run();
	}

	/**
	 * Handles draw for the game.
	 */
	draw() {
		this.ctx.clearRect(0, 0, World.canvas.width, World.canvas.height);
		this.cameraPos = -World.character.xPos + World.character.width;
		if (this.cameraPos > 0) this.cameraPos = 0;
		if (this.cameraPos < this.maxCameraPos) this.cameraPos = this.maxCameraPos;

		this.ctx.translate(this.cameraPos, 0);
		this.drawObjects();
		this.ctx.translate(-this.cameraPos, 0);
		this.drawStatusbars();
		requestAnimationFrame(() => this.draw());
	}

	/**
	 * Handles draw objects for the game.
	 */
	drawObjects() {
		this.addObjectsToMap(this.level.bgLayers);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.colObjects.bottles);
		this.addObjectsToMap(this.level.colObjects.coins);
		World.character.draw(this.ctx);
		this.level.bossChicken.draw(this.ctx);
	}

	/**
	 * Handles draw statusbars for the game.
	 */
	drawStatusbars() {
		this.level.bars.healthBar.draw(this.ctx);
		this.level.bars.coinBar.draw(this.ctx);
		this.level.bars.bottleBar.draw(this.ctx);
		if (this.level.bossChicken.isTriggered) {
			this.level.bars.healthEndboss.draw(this.ctx);
		}
	}

	/**
	 * Handles add objects to map for the game.
	 * @param {*} objects - objects value.
	 */
	addObjectsToMap(objects) {
		objects.forEach((object) => object.draw(this.ctx));
	}

	/**
	 * Handles run for the game.
	 */
	run() {
		IntervalHub.startInterval(() => {
			this.setRealFrames();
			this.checkCollisions();
			this.collectItems();
			this.throwObjects();
			this.checkGameEnd();
		}, 1000 / 60);
	}

	/**
	 * Handles set real frames for the game.
	 */
	setRealFrames() {
		World.character.setRealFrame();
		this.level.bossChicken.setRealFrame();
		this.level.enemies.forEach((enemy) => enemy.setRealFrame());
		this.level.colObjects.bottles.forEach((bottle) => bottle.setRealFrame());
		this.level.colObjects.coins.forEach((coin) => coin.setRealFrame());
		this.throwableObjects.forEach((bottle) => bottle.setRealFrame());
	}

	/**
	 * Handles check collisions for the game.
	 */
	checkCollisions() {
		this.collisionBossCharacter();
		this.level.enemies.forEach((enemy) => {
			this.collisionEnemyCharacter(enemy);
			this.collisionEnemyBottle(enemy);
		});
		this.throwableObjects.forEach((bottle) => {
			this.collisionBossBottle(bottle);
			this.removeBottle(bottle);
		});
	}

	/**
	 * Handles collision enemy character for the game.
	 * @param {*} enemy - enemy value.
	 */
	collisionEnemyCharacter(enemy) {
		if (!World.character.isColliding(enemy) || enemy.isDead()) return;

		const isStomp = World.character.isAboveGround() && World.character.isFalling() && World.character.isAboveObj(enemy);

		if (isStomp) {
			this.handleEnemyStomp(enemy);
		} else {
			this.handleEnemyDamage();
		}
	}

	/**
	 * Handles handle enemy stomp for the game.
	 * @param {*} enemy - enemy value.
	 */
	handleEnemyStomp(enemy) {
		enemy.die();
		setTimeout(() => {
			const currentIndex = this.level.enemies.indexOf(enemy);
			this.level.enemies.splice(currentIndex, 1);
		}, 1000);
		World.character.jump((World.character.height / 2) * 0.01);
	}

	/**
	 * Handles handle enemy damage for the game.
	 */
	handleEnemyDamage() {
		if (World.character.isInvulnerable()) return;
		World.character.isHit(this.level.config.damage);
		this.level.bars.healthBar.setPercentage(World.character.energy);
	}

	/**
	 * Handles collision enemy bottle for the game.
	 * @param {*} enemy - enemy value.
	 */
	collisionEnemyBottle(enemy) {
		this.throwableObjects.forEach((bottle) => {
			if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.hasHit) {
				enemy.die();
				bottle.hasHit = true;
				setTimeout(() => {
					const enemyId = this.level.enemies.indexOf(enemy);
					this.level.enemies.splice(enemyId, 1);
				}, 250);
			}
		});
	}

	/**
	 * Handles collision boss character for the game.
	 */
	collisionBossCharacter() {
		if (this.level.bossChicken.isColliding(World.character) && !this.level.bossChicken.isDead()) {
			if (!World.character.isInvulnerable()) {
				World.character.isHit(this.level.config.damage);
				this.level.bars.healthBar.setPercentage(World.character.energy);
			}
		}
	}

	/**
	 * Handles collision boss bottle for the game.
	 * @param {*} bottle - bottle value.
	 */
	collisionBossBottle(bottle) {
		if (!this.level.bossChicken.isDead() && bottle.isColliding(this.level.bossChicken) && !bottle.hasHit) {
			bottle.hasHit = true;
			if (!this.level.bossChicken.isHurt()) {
				this.level.bossChicken.isHit(this.level.config.bossDamage);
				this.level.bars.healthEndboss.setPercentage(this.level.bossChicken.energy);
			}
		}
	}

	/**
	 * Handles remove bottle for the game.
	 * @param {*} bottle - bottle value.
	 */
	removeBottle(bottle) {
		if (bottle.bottleHitGround() || bottle.hasHit) {
			setTimeout(() => {
				const bottleId = this.throwableObjects.indexOf(bottle);
				this.throwableObjects.splice(bottleId, 1);
			}, 300);
		}
	}

	/**
	 * Handles collect items for the game.
	 */
	collectItems() {
		this.level.colObjects.bottles.forEach((bottle) => this.collectBottles(bottle));
		this.level.colObjects.coins.forEach((coin) => this.collectCoins(coin));
	}

	/**
	 * Handles collect bottles for the game.
	 * @param {*} bottle - bottle value.
	 */
	collectBottles(bottle) {
		if (World.character.isColliding(bottle)) {
			this.collectedBottles++;
			const index = this.level.colObjects.bottles.indexOf(bottle);
			this.level.colObjects.bottles.splice(index, 1);
			this.level.bars.bottleBar.setPercentage(this.collectedBottles);
			AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
		}
	}

	/**
	 * Handles collect coins for the game.
	 * @param {*} coin - coin value.
	 */
	collectCoins(coin) {
		if (World.character.isColliding(coin)) {
			this.collectedCoins++;
			const index = this.level.colObjects.coins.indexOf(coin);
			this.level.colObjects.coins.splice(index, 1);
			this.level.bars.coinBar.setPercentage(this.collectedCoins);
			AudioHub.playOne(AudioHub.COLLECT);
		}
	}

	/**
	 * Handles throw objects for the game.
	 */
	throwObjects() {
		if (Keyboard.KEY_F && this.collectedBottles > 0 && Date.now() - this.lastThrow > this.throwCooldown) {
			const xPos = World.character.flipDirection ? World.character.rxPos : World.character.rxPos + World.character.rWidth;
			const yPos = World.character.yPos + World.character.height * 0.4;
			this.throwableObjects.push(new ThrowableObject(xPos, yPos, World.character.flipDirection));
			this.collectedBottles--;
			this.level.bars.bottleBar.setPercentage(this.collectedBottles);
			this.lastThrow = Date.now();
		}
	}

	/**
	 * Handles check game end for the game.
	 */
	checkGameEnd() {
		if (this.gameOver || (!World.character.isDead() && !this.level.bossChicken.isDead())) return;

		this.gameOver = true;
		this.stopGameIntervals();
		AudioHub.stopAll();
		const result = this.showGameResult();
		setTimeout(() => this.endScreen(result), 4000);
	}

	/**
	 * Handles stop game intervals for the game.
	 */
	stopGameIntervals() {
		IntervalHub.stopInterval(World.character.movementInterval);
		IntervalHub.stopInterval(this.level.bossChicken.movementInterval);
		this.level.enemies.forEach((enemy) => {
			IntervalHub.stopInterval(enemy.movementInterval);
			IntervalHub.stopInterval(enemy.animationInterval);
		});
		this.level.colObjects.bottles.forEach((bottle) => IntervalHub.stopInterval(bottle.animationInterval));
		this.level.colObjects.coins.forEach((coin) => IntervalHub.stopInterval(coin.animationInterval));
	}

	/**
	 * Handles show game result for the game.
	 */
	showGameResult() {
		if (World.character.isDead()) {
			AudioHub.playOne(AudioHub.PEPE_DEAD);
			World.character.showAnimationOnce(ImageHub.PEPE.dead.frames);
			IntervalHub.stopInterval(this.level.bossChicken.animationInterval);
			return "lost";
		}

		this.level.bossChicken.showAnimationOnce(ImageHub.BOSS_CHICKEN.dead.frames);
		IntervalHub.stopInterval(World.character.animationInterval);
		return "won";
	}
}
