/* global chrome */

const link = document.createElement('link');
link.href = chrome.runtime.getURL('/global.css');
link.id = 'stylish-chromenote';
link.type = 'text/css';
link.rel = 'stylesheet';

setTimeout(() => {
    document.body.prepend(link)
}, 100);
