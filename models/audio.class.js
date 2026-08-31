export class GameAudio {
	file;
	isLoaded;

	constructor(file) {
		this.file = new Audio(file);
	}
}
