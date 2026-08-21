export class IntervalHub {
	static allIntervals = {};

	static startInterval(name, func, timer) {
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
		clearInterval(this.allIntervals[name].id);
		delete this.allIntervals[name];
	}

	static pauseAllIntervals() {
		Object.keys(this.allIntervals).forEach((name) => this.pauseInterval(name));
	}

	static resumeAllIntervals() {
		Object.keys(this.allIntervals).forEach((name) => this.resumeInterval(name));
	}

	static stopAllIntervals() {
		IntervalHub.allIntervals.forEach(clearInterval);
		IntervalHub.allIntervals = {};
	}
}
