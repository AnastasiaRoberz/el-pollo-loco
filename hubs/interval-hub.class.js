/**
 * Represents the IntervalHub game object.
 */
export class IntervalHub {
	static allIntervals = {};

	/**
	  * Handles start interval for the game.
	 * @param {Function} func - func value.
	 * @param {number} time - time value.
	 */
	static startInterval(func, time) {
		const id = setInterval(func, time);
		this.allIntervals[id] = { id, handle: id, func, time, isPaused: false };
		return id;
	}

	/**
	  * Handles stop interval for the game.
	 * @param {number} id - id value.
	 */
	static stopInterval(id) {
		const interval = this.findInterval(id);
		if (!interval) return;

		clearInterval(interval.id);
		delete this.allIntervals[interval.handle];
	}

	/**
	  * Handles stop all intervals for the game.
	 */
	static stopAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => clearInterval(entry.id));
		this.allIntervals = {};
	}

	/**
	  * Handles pause interval for the game.
	 * @param {number} id - id value.
	 */
	static pauseInterval(id) {
		const interval = this.findInterval(id);
		if (!interval || interval.isPaused) return;

		clearInterval(interval.id);
		interval.isPaused = true;
	}

	/**
	  * Handles pause all intervals for the game.
	 */
	static pauseAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.pauseInterval(entry.id));
	}

	/**
	  * Handles resume interval for the game.
	 * @param {number} id - id value.
	 */
	static resumeInterval(id) {
		const interval = this.findInterval(id);
		if (interval && interval.isPaused) {
			interval.id = setInterval(interval.func, interval.time);
			interval.isPaused = false;
		}
	}

	/**
	  * Handles resume all intervals for the game.
	 */
	static resumeAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.resumeInterval(entry.handle));
	}

	/**
	  * Handles find interval for the game.
	 * @param {number} id - id value.
	 */
	static findInterval(id) {
		return Object.values(this.allIntervals).find((entry) => entry.handle === id || entry.id === id);
	}
}
