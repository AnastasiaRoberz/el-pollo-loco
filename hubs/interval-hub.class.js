export class IntervalHub {
	static allIntervals = {};

	/**
	 * @param {Function} func - Funktion, die ausgeführt werden soll
	 * @param {number} time - Intervallzeit in Millisekunden
	 * @returns {number} - native Intervall-ID
	 */

	static startInterval(func, time) {
		const id = setInterval(func, time);
		this.allIntervals[id] = { id, func, time, isPaused: false };
		return id;
	}

	static stopInterval(id) {
		clearInterval(id);
		delete this.allIntervals[id];
	}

	static stopAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => clearInterval(entry.id));
		this.allIntervals = {};
	}

	static pauseInterval(id, timeout) {
		const interval = this.allIntervals[id];
		clearInterval(interval.id);
		interval.isPaused = true;

		setTimeout(() => {
			if (interval.isPaused) {
				const newId = setInterval(interval.func, interval.time);
				delete this.allIntervals[id];
				interval.id = newId;
				interval.isPaused = false;
				this.allIntervals[newId] = interval;
			}
		}, timeout);
	}
}
