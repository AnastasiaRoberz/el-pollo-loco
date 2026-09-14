import { AudioHub } from "./hubs/audio-hub.class.js";
import { World } from "./models/world.class.js";
import { TemplateHub } from "./hubs/template-hub.js";
import { IntervalHub } from "./hubs/interval-hub.class.js";

const screenRef = document.getElementById("screen-wrapper");
const dialogRef = document.getElementById("dialog-content");
let currentDifficulty = localStorage.getItem("game_difficulty") || "MEDIUM";

window.addEventListener("load", () => {
	showStartScreen();
});

function init() {
	showGameScreen();
	AudioHub.playOne(AudioHub.GAME_SOUND);
	const canvas = document.getElementById("canvas");
	new World(canvas, showEndScreen, currentDifficulty);
}

function openFullscreen(element = document.documentElement) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

function toggleMuteIcon(currentScreen) {
	event.currentTarget.blur();
	const isMuted = AudioHub.toggleMute();
	if (!isMuted) AudioHub.playOne(AudioHub.GAME_SOUND);
	document.getElementById(`icon-mute-${currentScreen}`).classList.toggle("hidden", !isMuted);
	document.getElementById(`icon-sound-${currentScreen}`).classList.toggle("hidden", isMuted);
}

//#region START SCREEN
function showStartScreen() {
	screenRef.innerHTML = TemplateHub.startScreen();
	closeDialog();

	const isMuted = AudioHub.isMuted;
	const soundIcon = isMuted ? "icon-sound-start" : "icon-mute-start";
	document.getElementById(`${soundIcon}`).classList.add("hidden");

	bindStartScreenEvents();
}

function bindStartScreenEvents() {
	document.getElementById("btn-mute-start").addEventListener("click", () => toggleMuteIcon("start"));
	document.getElementById("btn-options").addEventListener("click", showDialogOptions);
	document.getElementById("btn-start-game").addEventListener("click", init);
	document.getElementById("btn-impressum").addEventListener("click", showDialogImpressum);
}
//#endregion

//#region GAME SCREEN
function showGameScreen() {
	screenRef.innerHTML = TemplateHub.gameScreen();
	closeDialog();

	const isMuted = AudioHub.isMuted;
	const soundIcon = isMuted ? "icon-sound-ingame" : "icon-mute-ingame";
	document.getElementById(`${soundIcon}`).classList.add("hidden");

	bindGameScreenEvents();
}

function bindGameScreenEvents() {
	document.getElementById("btn-mute-ingame").addEventListener("click", () => toggleMuteIcon("ingame"));
	document.getElementById("btn-pause").addEventListener("click", () => {
		event.currentTarget.blur();
		showDialogMenu();
		IntervalHub.pauseAllIntervals();
	});
}
//#endregion

//#region END SCREEN
function showEndScreen(result) {
	screenRef.insertAdjacentHTML("beforeend", TemplateHub.endScreen());
	document.getElementById("btn-mute-ingame").classList.add("hidden");
	document.getElementById("btn-pause").classList.add("hidden");
	document.getElementById("mobile-btns").classList.add("hidden");

	const resultImg = result === "won" ? "./assets/img/10_won_lost/end-screen-won.png" : "./assets/img/10_won_lost/end-screen-lost.png";
	document.getElementById("game-over").style.backgroundImage = `url(${resultImg})`;

	bindEndScreenEvents();
}

function bindEndScreenEvents() {
	document.getElementById("btn-restart-game").addEventListener("click", init);
	document.getElementById("btn-back-to-start").addEventListener("click", showStartScreen);
}
//#endregion

//#region DIALOG
function openDialog() {
	document.getElementById("game-dialog").show();
}

function closeDialog() {
	document.getElementById("game-dialog").close();
	IntervalHub.resumeAllIntervals();
}
// ----- MENU -----
function showDialogMenu() {
	openDialog();
	dialogRef.innerHTML = TemplateHub.dialogMenu();

	bindDialogMenuEvents();
}

function bindDialogMenuEvents() {
	document.getElementById("btn-resume-ingame").addEventListener("click", () => {
		closeDialog();
	});
	document.getElementById("btn-restart-ingame").addEventListener("click", init);
	document.getElementById("btn-options-ingame").addEventListener("click", () => {
		dialogRef.innerHTML = TemplateHub.dialogOptions();
		bindDialogOptionsEvents();
	});
	document.getElementById("btn-start-ingame").addEventListener("click", () => showStartScreen());
}
// ----------------

// ----- DIALOG OPTIONS -----
function showDialogOptions() {
	openDialog();
	dialogRef.innerHTML = TemplateHub.dialogOptions();

	bindDialogOptionsEvents();
}

function bindDialogOptionsEvents() {
	const volumeSlider = document.getElementById("volume-slider");
	const volumeValue = document.getElementById("volume-value");
	const muteAllInput = document.getElementById("toggle-mute-all");
	const muteMusicInput = document.getElementById("toggle-mute-music");

	volumeSlider.value = String(AudioHub.GAME_SOUND.file.volume / AudioHub.GAME_SOUND.baseVolume);
	volumeValue.textContent = `${Math.round(Number(volumeSlider.value) * 100)}%`;
	muteAllInput.checked = AudioHub.isMuted;
	muteMusicInput.checked = AudioHub.GAME_SOUND.file.muted && !AudioHub.isMuted;

	volumeSlider.addEventListener("input", () => {
		const volume = Number(volumeSlider.value);
		AudioHub.setMasterVolume(volume);
		volumeValue.textContent = `${Math.round(volume * 100)}%`;
	});

	muteAllInput.addEventListener("change", () => {
		if (muteAllInput.checked !== AudioHub.isMuted) AudioHub.toggleMute();
	});

	muteMusicInput.addEventListener("change", () => {
		AudioHub.setMusicMuted(muteMusicInput.checked);
		if (muteMusicInput.checked) AudioHub.stopOne(AudioHub.GAME_SOUND);
		else AudioHub.playOne(AudioHub.GAME_SOUND);
	});

	document.querySelectorAll(".btn-diff").forEach((button) => {
		button.addEventListener("click", () => {
			currentDifficulty = button.dataset.level;
			localStorage.setItem("game_difficulty", currentDifficulty);
			updateDifficultyUI(currentDifficulty);
		});
	});

	document.getElementById("btn-options-back").addEventListener("click", () => {
		if (document.getElementById("btn-resume-ingame")) {
			showDialogMenu();
		} else {
			closeDialog();
		}
	});

	updateDifficultyUI(currentDifficulty);
}
// --------------------------

// ----- DIALOG IMPRESSUM -----
function showDialogImpressum() {
	openDialog();
	dialogRef.innerHTML = TemplateHub.dialogImpressum();
	document.getElementById("btn-impressum-back").addEventListener("click", closeDialog);
}
// ----------------------------
//#endregion

//#region OPTIONS
export function setupDifficultyControls() {
	const gameContainer = document.getElementById("game-container");

	gameContainer.addEventListener("click", (event) => {
		const btn = event.target.closest(".btn-diff");
		if (!btn) return;
		currentDifficulty = btn.dataset.level;
		localStorage.setItem("game_difficulty", currentDifficulty);
		updateDifficultyUI(currentDifficulty);
	});
}

function updateDifficultyUI(selectedLevel) {
	const buttons = document.querySelectorAll(".btn-diff");
	buttons.forEach((btn) => {
		btn.classList.toggle("active", btn.dataset.level === selectedLevel);
	});
}

//#endregion
