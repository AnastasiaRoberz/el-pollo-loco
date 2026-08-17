class Cloud extends MovableObject {
	width = 1706;

	constructor() {
		super("5_background/layers/4_clouds/full.png");

		this.xPos = -Math.random() * 500;
	}
}
