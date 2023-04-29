console.log('Coming from background.js It runs when the browser is launched and is related to browser funcitonality and not specific page. For specific pages, see content-script.js')

// INJECTING PROGRAMATICALLY
// Use programmatic injection for content scripts that need to run in response to events or on specific occasions.
// To inject a content script programmatically, your extension needs host permissions for the page it's trying to inject scripts into.
// Host permissions can either be granted by requesting them as part of your extension's manifest (see host_permissions) or temporarily via activeTab.
// host_permission not working for me so i added activeTabs

// Adding content-script when the extension icon is clicked.
let isScriptInjected = false;


function injectScript(tab) {
    console.log("injected")
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
    })
    isScriptInjected = true;
}

function removeScript(tab) {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
        const script = document.querySelector('script[src="content-script.js"]');
        script && script.remove();
    }
    });
    console.log("removed")
    isScriptInjected = false
}


chrome.action.onClicked.addListener((tab) => {
    console.log("chrome extension clicked")
    if(isScriptInjected){
        removeScript(tab) 
    }else{
        injectScript(tab)
    }

})
