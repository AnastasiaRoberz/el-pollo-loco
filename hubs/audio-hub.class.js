import { GameAudio } from "../models/audio.class.js";

/**
 * Represents the AudioHub game object.
 */
export class AudioHub {
	static isMuted = true;
	static musicMuted = false;
	static masterVolume = 0.5;

	static GAME_SOUND = new GameAudio("./assets/audio/background_music.mp3", true, 0.05);
	static GAME_START = new GameAudio("./assets/audio/game/gameStart.mp3");

	static PEPE_DAMAGE = new GameAudio("./assets/audio/character/characterDamage.mp3");
	static PEPE_DEAD = new GameAudio("./assets/audio/character/characterDead.wav");
	static PEPE_JUMP = new GameAudio("./assets/audio/character/characterJump.wav");
	static PEPE_RUN = new GameAudio("./assets/audio/character/characterRun.mp3", true);
	static PEPE_SNORING = new GameAudio("./assets/audio/character/characterSnoring.mp3", true);

	static CHICKEN_DEAD = new GameAudio("./assets/audio/chicken/chickenDead.mp3");
	static CHICKEN_DEAD2 = new GameAudio("./assets/audio/chicken/chickenDead2.mp3");

	static COLLECT = new GameAudio("./assets/audio/collectibles/collectSound.wav");
	static BOTTLE_COLLECT = new GameAudio("./assets/audio/collectibles/bottleCollectSound.wav");

	static ENDBOSS_APPROACH = new GameAudio("./assets/audio/endboss/endbossApproach.wav", true, 1);

	static BOTTLE_BREAK = new GameAudio("./assets/audio/throwable/bottleBreak.mp3");

	static allSounds = [
		AudioHub.GAME_SOUND,
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

	/**
	  * Handles play one for the game.
	 * @param {GameAudio} sound - sound value.
	 */
	static playOne(sound) {
		if (sound.file.readyState > 0 || sound.isLoaded) {
			if (!sound.file.paused && !sound.file.ended) return;
			if (!sound.file.loop) sound.file.currentTime = 0;
			const playPromise = sound.file.play();
			if (playPromise) {
				playPromise.catch((error) => {
					if (error.name !== "AbortError") console.error("Audio playback failed:", error);
				});
			}
		}
	}

	/**
	  * Handles stop one for the game.
	 * @param {GameAudio} sound - sound value.
	 */
	static stopOne(sound) {
		sound.file.pause();
		sound.file.currentTime = 0;
	}

	/**
	  * Handles stop all for the game.
	 */
	static stopAll() {
		AudioHub.allSounds.forEach((sound) => {
			sound.file.pause();
			sound.file.currentTime = 0;
		});
	}

	/**
	  * Handles toggle mute for the game.
	 */
	static toggleMute() {
		this.isMuted = !this.isMuted;
		AudioHub.allSounds.forEach((sound) => {
			sound.file.muted = this.isMuted || (sound === AudioHub.GAME_SOUND && AudioHub.musicMuted);
		});
		return this.isMuted;
	}

	/**
	  * Handles set master volume for the game.
	 * @param {number} volume - volume value.
	 */
	static setMasterVolume(volume) {
		const normalizedVolume = Math.min(1, Math.max(0, volume));
		AudioHub.masterVolume = normalizedVolume;
		AudioHub.allSounds.forEach((sound) => {
			sound.file.volume = sound.baseVolume * normalizedVolume;
		});
	}

	/**
	  * Handles set music muted for the game.
	 * @param {boolean} isMuted - isMuted value.
	 */
	static setMusicMuted(isMuted) {
		AudioHub.musicMuted = isMuted;
		AudioHub.GAME_SOUND.file.muted = isMuted || AudioHub.isMuted;
	}
}

AudioHub.setMasterVolume(AudioHub.masterVolume);
