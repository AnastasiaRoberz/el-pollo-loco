/**
 * Represents the Keyboard game object.
 */
export class Keyboard {
	static LEFT = false;
	static RIGHT = false;
	static UP = false;
	static DOWN = false;
	static SPACE = false;
	static KEY_F = false;

	/**
	  * Handles init for the game.
	 */
	static init() {
		window.addEventListener("keydown", (event) => this.handleKeyDown(event));
		window.addEventListener("keyup", (event) => this.handleKeyUp(event));
		this.initTouchControls();
	}

	/**
	  * Handles handle key down for the game.
	 * @param {Event} event - event value.
	 */
	static handleKeyDown(event) {
		this.setKeyState(event.code, true);
	}

	/**
	  * Handles handle key up for the game.
	 * @param {Event} event - event value.
	 */
	static handleKeyUp(event) {
		this.setKeyState(event.code, false);
	}

	/**
	  * Handles set key state for the game.
	 * @param {string} code - code value.
	 * @param {boolean} isPressed - isPressed value.
	 */
	static setKeyState(code, isPressed) {
		if (code === "ArrowUp" || code === "KeyW") this.UP = isPressed;
		if (code === "ArrowLeft" || code === "KeyA") this.LEFT = isPressed;
		if (code === "ArrowDown" || code === "KeyS") this.DOWN = isPressed;
		if (code === "ArrowRight" || code === "KeyD") this.RIGHT = isPressed;
		if (code === "Space") this.SPACE = isPressed;
		if (code === "KeyF" || code === "KeyE") this.KEY_F = isPressed;
	}

	/**
	  * Handles init touch controls for the game.
	 */
	static initTouchControls() {
		this.bindButton("btn-mobile-left", "LEFT");
		this.bindButton("btn-mobile-right", "RIGHT");
		this.bindButton("btn-mobile-up", "SPACE");
		this.bindButton("btn-mobile-throw", "KEY_F");
	}

	/**
	  * Handles bind button for the game.
	 * @param {number} id - id value.
	 * @param {string} key - key value.
	 */
	static bindButton(id, key) {
		const btn = document.getElementById(id);

		this.bindButtonEvent(btn, "touchstart", key, true, true);
		this.bindButtonEvent(btn, "touchend", key, false, true);
		this.bindButtonEvent(btn, "mousedown", key, true);
		this.bindButtonEvent(btn, "mouseup", key, false);
		this.bindButtonEvent(btn, "mouseleave", key, false);
	}

	/**
	  * Handles bind button event for the game.
	 * @param {HTMLElement} btn - btn value.
	 * @param {string} eventName - eventName value.
	 * @param {string} key - key value.
	 * @param {boolean} value - value value.
	 * @param {boolean} preventDefault - preventDefault value.
	 */
	static bindButtonEvent(btn, eventName, key, value, preventDefault = false) {
		btn.addEventListener(eventName, (event) => {
			if (preventDefault) event.preventDefault();
			this[key] = value;
		});
	}

	/**
	  * Handles reset for the game.
	 */
	static reset() {
		this.LEFT = false;
		this.RIGHT = false;
		this.UP = false;
		this.DOWN = false;
		this.SPACE = false;
		this.KEY_F = false;
	}
}
