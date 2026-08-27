export class AudioHub {
	static GAME_START = new GameAudio("./assets/audio/game/gameStart.mp3");

	static PEPE_DAMAGE = new GameAudio("./assets/audio/character/characterDamage.mp3");
	static PEPE_DEAD = new GameAudio("./assets/audio/character/characterDead.wav");
	static PEPE_JUMP = new GameAudio("./assets/audio/character/characterJump.wav");
	static PEPE_RUN = new GameAudio("./assets/audio/character/characterRun.mp3");
	static PEPE_SNORING = new GameAudio("./assets/audio/character/characterSnoring.mp3");

	static CHICKEN_DEAD = new GameAudio("./assets/audio/chicken/chickenDead.mp3");
	static CHICKEN_DEAD2 = new GameAudio("./assets/audio/chicken/chickenDead2.mp3");

	static COLLECT = new GameAudio("./assets/audio/collectibles/collectSound.wav");
	static BOTTLE_COLLECT = new GameAudio("./assets/audio/collectibles/bottleCollectSound.wav");

	static ENDBOSS_APPROACH = new GameAudio("./assets/audio/endboss/endbossApproach.wav");

	static BOTTLE_BREAK = new GameAudio("./assets/audio/throwable/bottleBreak.mp3");

	static allSounds = [
		AudioHub.GAME_START,
		AudioHub.PEPE_DAMAGE,
		AudioHub.PEPE_DEAD,
		AudioHub.PEPE_JUMP,
		AudioHub.PEPE_RUN,
		AudioHub.PEPE_SNORING,
		AudioHub.CHICKEN_DEAD,
		AudioHub.CHICKEN_DEAD2,
		AudioHub.COLLECT,
		AudioHub.BOTTLE_COLLECT,
		AudioHub.ENDBOSS_APPROACH,
		AudioHub.BOTTLE_BREAK,
	];

	static playOne(sound) {
		sound.file.currentTime = 0;

		if (sound.file.readyState === 4 || sound.isLoaded) {
			sound.isLoaded = true;
			sound.file.play();
		}
	}

	static stopAll() {
		AudioHub.allSounds.forEach((sound) => {
			sound.file.pause();
		});
	}

	static stopOne(sound) {
		sound.file.pause();
	}
}
