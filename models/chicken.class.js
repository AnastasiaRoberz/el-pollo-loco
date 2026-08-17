class Chicken extends MovableObject {
	yPos = 320;
	width = 102;
	height = 100;

	constructor() {
		super("3_enemies_chicken/chicken_normal/1_walk/3_w.png");

		this.xPos = 200 + Math.random() * 500;
	}
}
