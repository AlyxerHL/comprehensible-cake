const BUTTONS_ROOT_QUERY = "div.PlayerCaption_player_caption_option__rCZXX";
const LANGUAGE_STATE = {
    both: "한/A",
    english: "ABC",
    korean: "한글",
    hide: "숨김",
};

const findAndCreateButtons = () => {
    const createStageButton = (stage, repeatState, languageState) => {
        const button = document.createElement("button");
        button.innerText = stage;

        button.addEventListener("click", async () => {
            if (repeat.ariaPressed !== repeatState.toString()) {
                repeat.click();
            }

            while (language.innerText !== languageState) {
                language.click();
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        });

        return button;
    };

    const root = document.querySelector(BUTTONS_ROOT_QUERY);
    if (!root) {
        return null;
    }

    const repeat = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(2)`);
    const language = document.querySelector(`${BUTTONS_ROOT_QUERY} :nth-child(3)`);
    const first = createStageButton(1, false, LANGUAGE_STATE.korean);
    const second = createStageButton(2, true, LANGUAGE_STATE.both);
    const third = createStageButton(3, false, LANGUAGE_STATE.hide);

    return { root, first, second, third };
};

chrome.runtime.onMessage.addListener((message) => {
    if (message === "comprehensible-cake") {
        const buttons = findAndCreateButtons();
        if (!buttons) {
            return;
        }

        buttons.root.appendChild(buttons.first);
        buttons.root.appendChild(buttons.second);
        buttons.root.appendChild(buttons.third);
    }
});
