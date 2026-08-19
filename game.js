import { Keyboard } from "./models/keyboard.class.js";
import { World } from "./models/world.class.js";

let canvas;
let world;

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas);
}

window.addEventListener("keydown", (event) => {
	if (event.code === "ArrowUp") Keyboard.UP = true;
	if (event.code === "ArrowDown") Keyboard.DOWN = true;
	if (event.code === "ArrowLeft") Keyboard.LEFT = true;
	if (event.code === "ArrowRight") Keyboard.RIGHT = true;
	if (event.code === "Space") Keyboard.SPACE = true;
});

window.addEventListener("keyup", (event) => {
	if (event.code === "ArrowUp") Keyboard.UP = false;
	if (event.code === "ArrowDown") Keyboard.DOWN = false;
	if (event.code === "ArrowLeft") Keyboard.LEFT = false;
	if (event.code === "ArrowRight") Keyboard.RIGHT = false;
	if (event.code === "Space") Keyboard.SPACE = false;
});

init();
