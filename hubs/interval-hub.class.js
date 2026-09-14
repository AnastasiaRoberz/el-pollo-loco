export class IntervalHub {
	static allIntervals = {};

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

	static pauseInterval(id) {
		const interval = this.allIntervals[id];
		clearInterval(interval.id);
		interval.isPaused = true;
	}

	static pauseAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.pauseInterval(entry.id));
	}

	static resumeInterval(id) {
		const interval = this.allIntervals[id];
		if (interval.isPaused) {
			const newId = setInterval(interval.func, interval.time);
			delete this.allIntervals[id];
			interval.id = newId;
			interval.isPaused = false;
			this.allIntervals[newId] = interval;
		}
	}

	static resumeAllIntervals() {
		Object.values(this.allIntervals).forEach((entry) => this.resumeInterval(entry.id));
	}
}
