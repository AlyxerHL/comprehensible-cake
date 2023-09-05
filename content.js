chrome.runtime.onMessage.addListener((message) => {
    if (message === "comprehensible-cake") {
        const buttonGroup = document.querySelector(
            "div.PlayerCaption_player_caption_option__rCZXX"
        );

        if (buttonGroup) {
            const languageButton = buttonGroup.lastElementChild;

            if (languageButton.innerText === "ABC") {
                languageButton.click();
                languageButton.click();
                languageButton.click();
            } else if (languageButton.innerText === "한글") {
                languageButton.click();
                languageButton.click();
            } else if (languageButton.innerText === "숨김") {
                languageButton.click();
            }

            languageButton.addEventListener("click", () => {
                if (languageButton.innerText === "ABC") {
                    languageButton.click();
                }
            });
        }
    }
});
