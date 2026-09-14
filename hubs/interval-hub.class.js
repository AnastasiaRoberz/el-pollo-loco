export class IntervalHub {
	static allIntervals = {};

	static startInterval(func, time) {
		const id = setInterval(func, time);
		this.allIntervals[id] = { id, handle: id, func, time, isPaused: false };
		return id;
	}

	static stopInterval(id) {
		const interval = this.findInterval(id);
		if (!interval) return;

		clearInterval(interval.id);
		delete this.allIntervals[interval.handle];
	}

	static stopAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => clearInterval(entry.id));
		this.allIntervals = {};
	}

	static pauseInterval(id) {
		const interval = this.findInterval(id);
		if (!interval || interval.isPaused) return;

		clearInterval(interval.id);
		interval.isPaused = true;
	}

	static pauseAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.pauseInterval(entry.id));
	}

	static resumeInterval(id) {
		const interval = this.findInterval(id);
		if (interval && interval.isPaused) {
			interval.id = setInterval(interval.func, interval.time);
			interval.isPaused = false;
		}
	}

	static resumeAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.resumeInterval(entry.handle));
	}

	static findInterval(id) {
		return Object.values(this.allIntervals).find((entry) => entry.handle === id || entry.id === id);
	}
}
