export class TemplateHub {
	static startScreen() {
		return /*html*/ `
        <div class="start" id="start-screen">
            <div class="start-menu">
                <div class="start-icon-btns">
                    <button class="icon-btn" id="btn-mute-start">
                        <svg class="icon" id="icon-sound-start">
                            <use href="./assets/icons.svg#icon-sound"></use>
                        </svg>
                        <svg class="icon" id="icon-mute-start">
                            <use href="./assets/icons.svg#icon-mute"></use>
                        </svg>
                    </button>
                    <button class="icon-btn" id="btn-options">
                        <svg class="icon">
                            <use href="./assets/icons.svg#icon-gear"></use>
                        </svg>
                    </button>
                </div>

                <button class="btn-start" id="btn-start-game">Start game</button>
            </div>

            <div class="footer">
                <p>© 2026 Anastasia Roberz | Developer Akademie</p>
                <button class="btn-impressum" id="btn-impressum">Impressum</button>
            </div>
        </div>
    `;
	}

	static gameScreen() {
		return /*html*/ `
        <div id="game-screen" class="game-screen">
            <canvas id="canvas" width="1280" height="720">
                {" "}
            </canvas>
            <div class="in-game-buttons">
                <button class="icon-btn" id="btn-mute-ingame">
                    <svg class="icon" id="icon-sound-ingame">
                        <use href="./assets/icons.svg#icon-sound"></use>
                    </svg>
                    <svg class="icon" id="icon-mute-ingame">
                        <use href="./assets/icons.svg#icon-mute"></use>
                    </svg>
                </button>
                <button class="icon-btn" id="btn-pause">
                    <svg class="icon">
                        <use href="./assets/icons.svg#icon-gear"></use>
                    </svg>
                </button>
            </div>
            <div class="btn-mobile-container" id="mobile-btns">
                <div class="btn-move">
                    <button class="btn-mobile" id="btn-mobile-left" aria-label="Move left">
                        <svg class="icon icon-arrow-left" aria-hidden="true">
                            <use href="./assets/icons.svg#icon-arrow-up"></use>
                        </svg>
                    </button>
                    <button class="btn-mobile right" id="btn-mobile-right" aria-label="Move right">
                        <svg class="icon icon-arrow-right" aria-hidden="true">
                            <use href="./assets/icons.svg#icon-arrow-up"></use>
                        </svg>
                    </button>
                </div>
                <div class="btn-actions">
                    <button class="btn-mobile up" id="btn-mobile-up" aria-label="Jump">
                        <svg class="icon icon-arrow-up" aria-hidden="true">
                            <use href="./assets/icons.svg#icon-arrow-up"></use>
                        </svg>
                    </button>
                    <button class="btn-mobile throw" id="btn-mobile-throw" aria-label="Throw bottle">
                        <svg class="icon icon-throw" aria-hidden="true">
                            <use href="./assets/icons.svg#icon-arrow-up"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
	}

	static endScreen() {
		return /*html*/ `
            <div class="game-over" id="game-over">
                <button class="btn-endscreen-restart" id="btn-restart-game">
                    Restart Game
                </button>
                <button class="btn-endscreen-back" id="btn-back-to-start">
                    Back to Start
                </button>
            </div>
    `;
	}

	static dialogMenu() {
		return /*html*/ `
            <div class="in-game-menu" id="in-game-menu">
                <h2>Game Paused</h2>

                <div class="in-game-menu-buttons">
                    <!-- Neuer Zurück-Button ins laufende Spiel -->
                    <button type="button" id="btn-resume-ingame" class="menu-btn btn-resume">
                        <span class="btn-arrow">▶</span> Continue
                    </button>

                    <!-- Deine bestehenden Buttons -->
                    <button type="button" id="btn-restart-ingame" class="menu-btn">Restart</button>
                    <button type="button" id="btn-options-ingame" class="menu-btn">Options</button>
                    <button type="button" id="btn-start-ingame" class="menu-btn btn-secondary">Back to Start</button>
                </div>
            </div>
    `;
	}

	static dialogOptions() {
		return /*html*/ `
            <div class="options-dialog" id="options">
    <h2>Options</h2>

    <div class="options-content">
        <fieldset class="options-group">
            <legend>Audio & Sound</legend>
            <div class="volume">
                <label for="volume-slider">Volume</label>
                <div class="range-wrap">
                    <input type="range" id="volume-slider" min="0" max="1" step="0.05" value="0.5" />
                    <span id="volume-value">50%</span>
                </div>
            </div>

            <div class="toggle-mute">
                <label class="toggle-control">
                    <input type="checkbox" id="toggle-mute-all" />
                    <span class="toggle-slider"></span>
                    Mute all Sounds
                </label>
            </div>

            <div class="toggle-mute">
                <label class="toggle-control">
                    <input type="checkbox" id="toggle-mute-music" />
                    <span class="toggle-slider"></span>
                    Mute game music
                </label>
            </div>
        </fieldset>

        <fieldset class="options-group">
            <legend>Difficulty</legend>
            <div class="difficulty-switch" role="radiogroup" aria-label="Schwierigkeitsgrad auswählen">
                <button type="button" class="btn-diff" data-level="EASY">Easy</button>
                <button type="button" class="btn-diff active" data-level="MEDIUM">Medium</button>
                <button type="button" class="btn-diff" data-level="HARD">Hard</button>
            </div>
        </fieldset>

        <fieldset class="options-group controls-hint">
            <legend>Control</legend>
            <p><span>Walk:</span> ◀ ▶ or A / D</p>
            <p><span>Jump:</span> Space or W / ▲</p>
            <p><span>Throw:</span> F or E</p>
        </fieldset>
    </div>

    <div class="options-footer">
        <button type="button" class="btn-back" id="btn-options-back" aria-label="Zurück">
            <span class="btn-arrow">◀</span> Zurück
        </button>
    </div>
</div>
    `;
	}

	static dialogImpressum() {
		return /*html*/ `
            <div class="impressum">
                <div class="impressum-header">
                    <h2>Impressum & Rechtliches</h2>
                </div>

                <div class="impressum-content">
                    <p><strong class="bold">Entwickler: </strong> Anastasia Roberz</p>
                    <hr>
                    <p>
                        <strong class="bold">GitHub: </strong>
                        <a href="https://github.com/AnastasiaRoberz" target="_blank" rel="noopener noreferrer">github.com/AnastasiaRoberz</a>
                    </p>
                    <hr>
                    <p><strong class="bold">Kontakt: </strong>anastasia.roberz@gmx.de</p>
                </div>

                <!-- Zurück-Button -->
                <div class="impressum-footer">
                    <button type="button" class="btn-back" id="btn-impressum-back">
                        <span class="btn-arrow">◀</span> Zurück
                    </button>
                </div>
            </div>
        `;
	}
}
