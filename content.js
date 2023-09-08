const BUTTONS_ROOT_QUERY = "div.PlayerCaption_player_caption_option__rCZXX";
const LANGUAGE_STATE = {
    both: "한/A",
    english: "ABC",
    korean: "한글",
    hide: "숨김",
};

/**
 * @param {number} stage
 * @param {HTMLButtonElement} repeatButton
 * @param {boolean} repeatState
 * @param {HTMLButtonElement} languageButton
 * @param {string} languageState
 * @returns {HTMLButtonElement}
 */
const createStageButton = (stage, repeatButton, repeatState, languageButton, languageState) => {
    const button = document.createElement("button");
    button.innerText = stage;

    button.addEventListener("click", async () => {
        if (repeatButton.ariaPressed !== repeatState.toString()) {
            repeatButton.click();
        }

        while (languageButton.innerText !== languageState) {
            languageButton.click();
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    });

    return button;
};

/**
 * @typedef {{
 *     root: HTMLDivElement,
 *     first: HTMLButtonElement,
 *     second: HTMLButtonElement,
 *     third: HTMLButtonElement,
 * }} Buttons
 * @returns {Buttons | null}
 */
const findAndCreateButtons = () => {
    const root = document.querySelector(BUTTONS_ROOT_QUERY);
    if (!root) {
        return null;
    }

    const repeat = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(2)`);
    const language = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(3)`);
    const first = createStageButton(1, repeat, false, language, LANGUAGE_STATE.korean);
    const second = createStageButton(2, repeat, true, language, LANGUAGE_STATE.both);
    const third = createStageButton(3, repeat, false, language, LANGUAGE_STATE.hide);

    return { root, first, second, third };
};

chrome.runtime.onMessage.addListener((message) => {
    if (message === "comprehensible-cake") {
        const buttons = findAndCreateButtons();
        if (!buttons) {
            return;
        }

        buttons.first.click();
        buttons.root.appendChild(buttons.first);
        buttons.root.appendChild(buttons.second);
        buttons.root.appendChild(buttons.third);
    }
});
