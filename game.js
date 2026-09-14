import { AudioHub } from "./hubs/audio-hub.class.js";
import { World } from "./models/world.class.js";
import { TemplateHub } from "./hubs/template-hub.js";
import { IntervalHub } from "./hubs/interval-hub.class.js";

const screenRef = document.getElementById("screen-wrapper");
const dialogRef = document.getElementById("dialog-content");
let currentDifficulty = localStorage.getItem("game_difficulty") || "MEDIUM";

window.addEventListener("load", () => {
	showStartScreen();
	document.getElementById("flip").addEventListener("click", rotateAndOpenFullscreen);
});

function init() {
	showGameScreen();
	AudioHub.playOne(AudioHub.GAME_SOUND);
	const canvas = document.getElementById("canvas");
	new World(canvas, showEndScreen, currentDifficulty);
}

function openFullscreen(element = document.documentElement) {
	if (element.requestFullscreen) {
		return element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		return element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		return element.msRequestFullscreen();
	}

	return Promise.reject(new Error("Fullscreen is not supported by this browser."));
}

function rotateAndOpenFullscreen() {
	const fullscreenTarget = document.getElementById("game-container");
	openFullscreen(fullscreenTarget)
		.then(() => {
			if (screen.orientation && screen.orientation.lock) {
				return screen.orientation.lock("landscape");
			}
		})
		.catch((error) => {
			if (error.name !== "NotSupportedError" && error.name !== "SecurityError") {
				console.error("Fullscreen or screen orientation could not be activated.", error);
			}
		});
}

function toggleMuteIcon(currentScreen) {
	event.currentTarget.blur();
	AudioHub.toggleMute();
	updateMuteControls();
	if (!AudioHub.isMuted) AudioHub.playOne(AudioHub.GAME_SOUND);
}

function updateMuteControls() {
	["start", "ingame"].forEach((screen) => {
		const muteIcon = document.getElementById(`icon-mute-${screen}`);
		const soundIcon = document.getElementById(`icon-sound-${screen}`);

		if (muteIcon && soundIcon) {
			muteIcon.classList.toggle("hidden", !AudioHub.isMuted);
			soundIcon.classList.toggle("hidden", AudioHub.isMuted);
		}
	});

	const muteAllInput = document.getElementById("toggle-mute-all");
	if (muteAllInput) muteAllInput.checked = AudioHub.isMuted;
}

//#region START SCREEN
function showStartScreen() {
	screenRef.innerHTML = TemplateHub.startScreen();
	closeDialog();

	updateMuteControls();

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

	updateMuteControls();

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

	volumeSlider.value = String(AudioHub.masterVolume);
	volumeValue.textContent = `${Math.round(AudioHub.masterVolume * 100)}%`;
	muteAllInput.checked = AudioHub.isMuted;
	muteMusicInput.checked = AudioHub.GAME_SOUND.file.muted && !AudioHub.isMuted;

	volumeSlider.addEventListener("input", () => {
		const volume = Number(volumeSlider.value);
		AudioHub.setMasterVolume(volume);
		volumeValue.textContent = `${Math.round(volume * 100)}%`;
	});

	muteAllInput.addEventListener("change", () => {
		if (muteAllInput.checked !== AudioHub.isMuted) AudioHub.toggleMute();
		updateMuteControls();
		if (!AudioHub.isMuted) AudioHub.playOne(AudioHub.GAME_SOUND);
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
