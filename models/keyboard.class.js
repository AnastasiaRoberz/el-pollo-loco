export class Keyboard {
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = false;
	SPACE = false;
	KEY_F = false;

	constructor() {
		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("keydown", (event) => this.handleKeyDown(event));
		window.addEventListener("keyup", (event) => this.handleKeyUp(event));
	}

	handleKeyDown(event) {
		this.setKeyState(event.code, true);
	}

	handleKeyUp(event) {
		this.setKeyState(event.code, false);
	}

	setKeyState(code, isPressed) {
		if (code === "ArrowUp" || code === "KeyW") this.UP = isPressed;
		if (code === "ArrowLeft" || code === "KeyA") this.LEFT = isPressed;
		if (code === "ArrowDown" || code === "KeyS") this.DOWN = isPressed;
		if (code === "ArrowRight" || code === "KeyD") this.RIGHT = isPressed;
		if (code === "Space") this.SPACE = isPressed;
		if (code === "KeyF" || code === "KeyE") this.KEY_F = isPressed;
	}

	reset() {
		this.LEFT = false;
		this.RIGHT = false;
		this.UP = false;
		this.DOWN = false;
		this.SPACE = false;
		this.KEY_F = false;
	}
}
