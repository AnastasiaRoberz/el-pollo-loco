import { World } from "./models/world.class.js";

const gameOverlay = document.getElementById("game-over");

function init(difficulty = "MEDIUM") {
	document.getElementById("start-screen").classList.add("hidden");
	document.getElementById("game-container").classList.remove("hidden");
	const canvas = document.getElementById("canvas");
	// const world = new World(canvas, handleGameOver);
	const world = new World(canvas, difficulty);
}

init();

function handleGameOver(result) {
	const imgRef = document.getElementById("result-container");
	const imgSrc = result === "won" ? "./assets/img/You won, you lost/You Win A.png" : "./assets/img/You won, you lost/You lost.png";
	gameOverlay.classList.remove("hidden");

	imgRef.innerHTML = /*html*/ `
		<img class="result-img" src="${imgSrc}" alt="">
		`;
}

function restartGame() {
	gameOverlay.classList.add("hidden");
	init();
}

// document.getElementById("btn-start-game").addEventListener("click", init);
// document.getElementById("btn-restart-game").addEventListener("click", restartGame);
