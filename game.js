import { World } from "./models/world.class.js";

function init() {
	document.getElementById("start-screen").classList.add("hidden");
	const canvas = document.getElementById("canvas");
	canvas.classList.remove("hidden");
	const world = new World(canvas);
}

document.getElementById("btn-start-game").addEventListener("click", init);
