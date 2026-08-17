class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken()];
	bgLayer = [new BackgroundLayer("3_third_layer"), new BackgroundLayer("2_second_layer"), new BackgroundLayer("1_first_layer")];
	clouds = new Cloud();
	canvas;
	ctx;
	bgImg;

	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.bgImg = new Image();
		this.bgImg.src = "../assets/img/5_background/layers/air.png";
		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(this.bgImg, 0, 0, 720, 480);
		this.addObjectsToMap(this.bgLayer);
		this.addItemToMap(this.clouds);
		this.addItemToMap(this.character);
		this.addObjectsToMap(this.enemies);

		requestAnimationFrame(() => this.draw());
	}

	addObjectsToMap(objects) {
		objects.forEach((object) => this.addItemToMap(object));
	}

	addItemToMap(item) {
		this.ctx.drawImage(item.img, item.xPos, item.yPos, item.width, item.height);
	}
}
