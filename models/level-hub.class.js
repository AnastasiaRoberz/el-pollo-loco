export class LevelHub {
	static LEVEL_EASY = {
		// Welt
		sections: 3,
		damage: 10,
		invulnerabilityDuration: 1000,

		// Collectibles
		amountBottles: 20,
		amountCoins: 30,
		coinsForBottle: 5,
		bottleDamage: 25,

		// Gegner
		enemies: 15,
		enemySpeedMin: 0.15,
		enemySpeedMax: 0.35,
		chickenRatio: 0.2,

		// Endboss
		bossEnergy: 100,
		bossSpeed: 2.0,
		bossDamage: 20,
	};

	static LEVEL_MEDIUM = {
		// Welt
		sections: 5,
		damage: 15,
		invulnerabilityDuration: 800,

		// Collectibles
		amountBottles: 15,
		amountCoins: 20,
		coinsForBottle: 10,
		bottleDamage: 20,

		// Gegner
		enemies: 25,
		enemySpeedMin: 0.25,
		enemySpeedMax: 0.55,
		chickenRatio: 0.5,

		// Endboss
		bossEnergy: 150,
		bossSpeed: 3.0,
		bossDamage: 30,
	};

	static LEVEL_HARD = {
		// Welt
		sections: 7,
		damage: 25,
		invulnerabilityDuration: 500,

		// Collectibles
		amountBottles: 8,
		amountCoins: 12,
		coinsForBottle: 15,
		bottleDamage: 15,

		// Gegner
		enemies: 40,
		enemySpeedMin: 0.4,
		enemySpeedMax: 0.8,
		chickenRatio: 0.8,

		// Endboss
		bossEnergy: 200,
		bossSpeed: 4.5,
		bossDamage: 40,
	};
}
