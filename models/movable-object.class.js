class MovableObject {
	img;
	xPos = 0;
	yPos = 0;
	width;
	height = 480;

	constructor(path) {
		this.loadImg(path);
	}

	loadImg(path) {
		this.img = new Image();
		this.img.src = "../assets/img/" + path;
	}
}
