export class ImageHub {
	// --- CHARACTER (PEPE) ---
	static PEPE = Object.freeze({
		idle: {
			offset: { topRatio: 0.52, bottomRatio: 0.05, leftRatio: 0.2, rightRatio: 0.31 },
			frames: [
				"./assets/img/2_character_pepe/1_idle/idle/I-1.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-2.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-3.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-4.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-5.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-6.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-7.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-8.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-9.png",
				"./assets/img/2_character_pepe/1_idle/idle/I-10.png",
			],
		},
		longIdle: {
			offset: { topRatio: 0.52, bottomRatio: 0.05, leftRatio: 0.2, rightRatio: 0.32 },
			frames: [
				"./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
				"./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
			],
		},
		longIdleFlip: {
			offset: { topRatio: 0.52, bottomRatio: 0.05, leftRatio: 0.32, rightRatio: 0.2 },
			frames: [
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-21.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-22.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-23.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-24.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-25.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-26.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-27.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-28.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-29.png",
				"./assets/img/2_character_pepe/1_idle/long_idle_flip/I-30.png",
			],
		},
		walk: {
			offset: { topRatio: 0.5, bottomRatio: 0.05, leftRatio: 0.21, rightRatio: 0.31 },
			frames: [
				"./assets/img/2_character_pepe/2_walk/W-21.png",
				"./assets/img/2_character_pepe/2_walk/W-22.png",
				"./assets/img/2_character_pepe/2_walk/W-23.png",
				"./assets/img/2_character_pepe/2_walk/W-24.png",
				"./assets/img/2_character_pepe/2_walk/W-25.png",
				"./assets/img/2_character_pepe/2_walk/W-26.png",
			],
		},
		jump: {
			offset: { topRatio: 0.54, bottomRatio: 0.05, leftRatio: 0.3, rightRatio: 0.31 },
			frames: [
				"./assets/img/2_character_pepe/3_jump/J-31.png",
				"./assets/img/2_character_pepe/3_jump/J-32.png",
				"./assets/img/2_character_pepe/3_jump/J-33.png",
				"./assets/img/2_character_pepe/3_jump/J-34.png",
				"./assets/img/2_character_pepe/3_jump/J-35.png",
				"./assets/img/2_character_pepe/3_jump/J-36.png",
				"./assets/img/2_character_pepe/3_jump/J-37.png",
				"./assets/img/2_character_pepe/3_jump/J-38.png",
				"./assets/img/2_character_pepe/3_jump/J-39.png",
			],
		},
		hurt: {
			offset: { topRatio: 0.48, bottomRatio: 0.05, leftRatio: 0.26, rightRatio: 0.17 },
			frames: [
				"./assets/img/2_character_pepe/4_hurt/H-41.png",
				"./assets/img/2_character_pepe/4_hurt/H-42.png",
				"./assets/img/2_character_pepe/4_hurt/H-43.png",
				"./assets/img/2_character_pepe/4_hurt/H-44.png",
				"./assets/img/2_character_pepe/4_hurt/H-45.png",
				"./assets/img/2_character_pepe/4_hurt/H-46.png",
				"./assets/img/2_character_pepe/4_hurt/H-47.png",
			],
		},
		dead: {
			offset: { topRatio: 0, bottomRatio: 0, leftRatio: 0, rightRatio: 0 },
			frames: [
				"./assets/img/2_character_pepe/5_dead/D-51.png",
				"./assets/img/2_character_pepe/5_dead/D-52.png",
				"./assets/img/2_character_pepe/5_dead/D-53.png",
				"./assets/img/2_character_pepe/5_dead/D-54.png",
				"./assets/img/2_character_pepe/5_dead/D-55.png",
				"./assets/img/2_character_pepe/5_dead/D-56.png",
			],
		},
	});

	// --- ENEMIES (CHICKEN) ---
	static NORMAL_CHICKEN = Object.freeze({
		walk: {
			frames: [
				"./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
				"./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
				"./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
			],
		},
		dead: {
			frame: ["./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"],
		},
	});

	static SMALL_CHICKEN = Object.freeze({
		walk: {
			frames: [
				"./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
				"./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
				"./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
			],
		},
		dead: {
			frame: "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
		},
	});

	static BOSS_CHICKEN = Object.freeze({
		walk: {
			offset: { topRatio: 0.18, bottomRatio: 0.08, leftRatio: 0.07, rightRatio: 0.03 },
			frames: [
				"./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
				"./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
				"./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
				"./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
			],
		},
		alert: {
			offset: { topRatio: 0.19, bottomRatio: 0.03, leftRatio: 0.07, rightRatio: 0.04 },
			frames: [
				"./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
				"./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
			],
		},
		attack: {
			offset: { topRatio: 0.18, bottomRatio: 0.19, leftRatio: 0.1, rightRatio: 0.03 },
			frames: [
				"./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
				"./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
			],
		},
		hurt: {
			offset: { topRatio: 0.16, bottomRatio: 0.1, leftRatio: 0.11, rightRatio: 0.05 },
			frames: [
				"./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
				"./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
				"./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
			],
		},
		dead: {
			offset: { topRatio: 0, bottomRatio: 0, leftRatio: 0, rightRatio: 0 },
			frames: [
				"./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
				"./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
				"./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
			],
		},
	});

	// --- BACKGROUND & LAYOUT ---
	static BACKGROUND = Object.freeze({
		firstLayer: ["./assets/img/5_background/layers/1_first_layer/1.png", "./assets/img/5_background/layers/1_first_layer/2.png"],
		secondLayer: ["./assets/img/5_background/layers/2_second_layer/1.png", "./assets/img/5_background/layers/2_second_layer/2.png"],
		thirdLayer: ["./assets/img/5_background/layers/3_third_layer/1.png", "./assets/img/5_background/layers/3_third_layer/2.png"],
		clouds: ["./assets/img/5_background/layers/4_clouds/1.png", "./assets/img/5_background/layers/4_clouds/2.png"],
		air: "./assets/img/5_background/layers/air.png",
	});

	// --- ITEMS ---
	static BOTTLE = Object.freeze({
		rotation: [
			"./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
		],
		splash: [
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
			"./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
		],
		onGround: ["./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"],
	});

	static COIN = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

	// --- STATUSBARS ---
	static STATUSBAR = Object.freeze({
		icons: {
			coin: "./assets/img/7_statusbars/3_icons/icon_coin.png",
			health: "./assets/img/7_statusbars/3_icons/icon_health.png",
			bottle: "./assets/img/7_statusbars/3_icons/icon_salsa_bottle.png",
			healthEndboss: "./assets/img/7_statusbars/3_icons/icon_health_endboss.png",
		},
		barElements: {
			empty: "./assets/img/7_statusbars/4_bar_elements/statusbar_empty.png",
			blue: "./assets/img/7_statusbars/4_bar_elements/statusbar_blue.png",
			green: "./assets/img/7_statusbars/4_bar_elements/statusbar_green.png",
			orange: "./assets/img/7_statusbars/4_bar_elements/statusbar_orange.png",
		},
	});

	// --- START- & ENDSCREENS ---
	static INTRO_OUTRO_SCREENS = {
		start: ["./assets/img/9_intro_outro_screens/start/startscreen_1.png"],
		won: [
			"./assets/img/You won, you lost/You Win A.png",
			"./assets/img/You won, you lost/You win B.png",
			"./assets/img/You won, you lost/You won A.png",
			"./assets/img/You won, you lost/You Won B.png",
		],
		lost: [
			"./assets/img/9_intro_outro_screens/game_over/game over!.png",
			"./assets/img/9_intro_outro_screens/game_over/game over.png",
			"./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png",
			"./assets/img/9_intro_outro_screens/game_over/you lost.png",
			"./assets/img/You won, you lost/Game over A.png",
			"./assets/img/You won, you lost/Game Over.png",
			"./assets/img/You won, you lost/You lost b.png",
			"./assets/img/You won, you lost/You lost.png",
		],
	};
}
