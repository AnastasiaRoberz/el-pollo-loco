/**
 * Represents the GameAudio game object.
 */
export class GameAudio {
	file;
	isLoaded = false;
	baseVolume;

	/**
	 * Creates and initializes the object.
	 * @param {string} file - file value.
	 * @param {*} loop - loop value.
	 * @param {number} volume - volume value.
	 * @param {boolean} isMuted - isMuted value.
	 */
	constructor(file, loop = false, volume = 0.2, isMuted = true) {
		this.file = new Audio(file);
		this.file.loop = loop;
		this.file.volume = volume;
		this.file.muted = isMuted;
		this.baseVolume = volume;
	}
}
