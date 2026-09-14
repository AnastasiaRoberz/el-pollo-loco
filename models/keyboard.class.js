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
		this.initTouchControls();
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

	static initTouchControls() {
		this.bindButton("btn-mobile-left", "LEFT");
		this.bindButton("btn-mobile-right", "RIGHT");
		this.bindButton("btn-mobile-up", "SPACE");
		this.bindButton("btn-mobile-throw", "KEY_F");
	}

	static bindButton(id, key) {
		const btn = document.getElementById(id);

		this.bindButtonEvent(btn, "touchstart", key, true, true);
		this.bindButtonEvent(btn, "touchend", key, false, true);
		this.bindButtonEvent(btn, "mousedown", key, true);
		this.bindButtonEvent(btn, "mouseup", key, false);
		this.bindButtonEvent(btn, "mouseleave", key, false);
	}

	static bindButtonEvent(btn, eventName, key, value, preventDefault = false) {
		btn.addEventListener(eventName, (event) => {
			if (preventDefault) event.preventDefault();
			this[key] = value;
		});
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
