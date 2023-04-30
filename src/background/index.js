/*global chrome*/
console.log('Coming from background.js It runs when the browser is launched and is related to browser funcitonality and not specific page. For specific pages, see content-script.js')

// INJECTING PROGRAMATICALLY
// Use programmatic injection for content scripts that need to run in response to events or on specific occasions.
// To inject a content script programmatically, your extension needs host permissions for the page it's trying to inject scripts into.
// Host permissions can either be granted by requesting them as part of your extension's manifest (see host_permissions) or temporarily via activeTab.
// host_permission not working for me so i added activeTabs


// 👇 CALLED WHEN THE USER CLICKS ON THE BROWSER ACTION (THE EXTENSION ICON)
// =========================================================================

chrome.action.onClicked.addListener((tab) => {
    // Adding content-script to tab.
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
    })

    // FOR TOGGLE FEATURE
    // ==================

    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true },
        (tabs) => {
            var activeTab = tabs[0]
            chrome.tabs.sendMessage(activeTab.id,
                { "message": "clicked_browser_action" }
            )
        })
})
