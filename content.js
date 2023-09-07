const BUTTONS_ROOT_QUERY = "div.PlayerCaption_player_caption_option__rCZXX";

const LANGUAGE_STATE = {
    both: "한/A",
    english: "ABC",
    korean: "한글",
    hide: "숨김",
};

/**
 * @param {HTMLButtonElement} repeatButton
 * @param {boolean} state
 */
const setRepeatState = (repeatButton, state) => {
    if (repeatButton.ariaPressed !== state.toString()) {
        repeatButton.click();
    }
};

/**
 * @param {HTMLButtonElement} languageButton
 * @param {string} state
 */
const setLanguageState = async (languageButton, state) => {
    while (languageButton.innerText !== state) {
        languageButton.click();
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
};

/**
 * @typedef {{ root: HTMLDivElement, repeat: HTMLButtonElement, language: HTMLButtonElement }} Buttons
 * @returns {Buttons | null}
 */
const findButtons = () => {
    const root = document.querySelector(BUTTONS_ROOT_QUERY);
    const repeat = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(2)`);
    const language = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(3)`);
    return !!root && !!repeat && !!language ? { root, repeat, language } : null;
};

/**
 * @param {Buttons} buttons
 * @returns {HTMLButtonElement}
 */
const createFirstButton = (buttons) => {
    const firstButton = document.createElement("button");
    firstButton.innerText = "1";

    firstButton.addEventListener("click", () => {
        setRepeatState(buttons.repeat, false);
        setLanguageState(buttons.language, LANGUAGE_STATE.korean);
    });

    return firstButton;
};

/**
 * @param {Buttons} buttons
 * @returns {HTMLButtonElement}
 */
const createSecondButton = (buttons) => {
    const secondButton = document.createElement("button");
    secondButton.innerText = "2";

    secondButton.addEventListener("click", () => {
        setRepeatState(buttons.repeat, true);
        setLanguageState(buttons.language, LANGUAGE_STATE.both);
    });

    return secondButton;
};

/**
 * @param {Buttons} buttons
 * @returns {HTMLButtonElement}
 */
const createThirdButton = (buttons) => {
    const thirdButton = document.createElement("button");
    thirdButton.innerText = "3";

    thirdButton.addEventListener("click", () => {
        setRepeatState(buttons.repeat, false);
        setLanguageState(buttons.language, LANGUAGE_STATE.hide);
    });

    return thirdButton;
};

chrome.runtime.onMessage.addListener((message) => {
    if (message === "comprehensible-cake") {
        const buttons = findButtons();
        if (!buttons) {
            return;
        }

        const firstButton = createFirstButton(buttons);
        const secondButton = createSecondButton(buttons);
        const thirdButton = createThirdButton(buttons);

        buttons.root.appendChild(firstButton);
        buttons.root.appendChild(secondButton);
        buttons.root.appendChild(thirdButton);
    }
});
