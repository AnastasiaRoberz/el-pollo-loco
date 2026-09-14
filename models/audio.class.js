export class GameAudio {
	file;
	isLoaded = false;

	constructor(file, loop = false, volume = 0.2, isMuted = true) {
		this.file = new Audio(file);
		this.file.loop = loop;
		this.file.volume = volume;
		this.file.muted = isMuted;
	}
}
