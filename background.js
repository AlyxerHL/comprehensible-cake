chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes("youtube")) {
        chrome.tabs.sendMessage(details.tabId, "comprehensible-cake");
    }
});
