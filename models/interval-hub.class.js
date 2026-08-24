export class IntervalHub {
	static allIntervals = {};

	/**
	 * @param {string} name - eindeutiger Bezeichner für das Interval
	 * @param {Function} func - Funktion, die ausgeführt werden soll
	 * @param {number} timer - Intervallzeit in Millisekunden
	 * @returns {number} - native Intervall-ID
	 */

	static startInterval(name, func, timer) {
		this.stopInterval(name);
		const id = setInterval(func, timer);
		this.allIntervals[name] = { id, func, timer, isPaused: false };
		return id;
	}

	static pauseInterval(name) {
		const item = this.allIntervals[name];
		if (item && !item.isPaused) {
			clearInterval(item.id);
			item.id = null;
			item.isPaused = true;
		}
	}

	static resumeInterval(name) {
		const item = this.allIntervals[name];
		if (item && item.isPaused) {
			item.id = setInterval(item.func, item.timer);
			item.isPaused = false;
		}
	}

	static stopInterval(name) {
		if (this.allIntervals[name]) clearInterval(this.allIntervals[name].id);
		delete this.allIntervals[name];
	}

	static pauseAllIntervals() {
		Object.keys(this.allIntervals).forEach((name) => this.pauseInterval(name));
	}

	static resumeAllIntervals() {
		Object.keys(this.allIntervals).forEach((name) => this.resumeInterval(name));
	}

	static stopAllIntervals() {
		Object.keys(this.allIntervals).forEach((name) => this.stopInterval(name));
		this.allIntervals = {};
	}
}
