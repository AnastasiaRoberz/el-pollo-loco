class Character extends MovableObject {
	xPos = 50;
	width = 223;
	height = 440;

	constructor() {
		super("2_character_pepe/1_idle/idle/I-1.png");
	}

	move() {
		this.xPos += 20;
	}

	jump() {}
}
