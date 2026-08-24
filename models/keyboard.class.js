export class Keyboard {
	static LEFT = false;
	static RIGHT = false;
	static UP = false;
	static DOWN = false;
	static SPACE = false;
	static KEY_F = false;

	static init() {
		window.addEventListener("keydown", (event) => this.handleKeyDown(event));
		window.addEventListener("keyup", (event) => this.handleKeyUp(event));
	}

	static handleKeyDown(event) {
		this.setKeyState(event.code, true);
	}

	static handleKeyUp(event) {
		this.setKeyState(event.code, false);
	}

	static setKeyState(code, isPressed) {
		if (code === "ArrowUp" || code === "KeyW") this.UP = isPressed;
		if (code === "ArrowLeft" || code === "KeyA") this.LEFT = isPressed;
		if (code === "ArrowDown" || code === "KeyS") this.DOWN = isPressed;
		if (code === "ArrowRight" || code === "KeyD") this.RIGHT = isPressed;
		if (code === "Space") this.SPACE = isPressed;
		if (code === "KeyF" || code === "KeyE") this.KEY_F = isPressed;
	}

	static reset() {
		this.LEFT = false;
		this.RIGHT = false;
		this.UP = false;
		this.DOWN = false;
		this.SPACE = false;
		this.KEY_F = false;
	}
}
