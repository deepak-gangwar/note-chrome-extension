/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.jsx'
import '../styles/index.css'

// console.clear();

const app = document.createElement('div')
app.setAttribute('id', 'note-chrome-extension-app')
document.body.appendChild(app)

// ReactDOM.createRoot(document.getElementById('note-chrome-extension-app')).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// )

// 👇 The following is an alternative to the JSX above 👆

const extensionApp = React.createElement(React.StrictMode, null, React.createElement(App))
ReactDOM.createRoot(app).render(extensionApp)

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            toggle()
        }
    }
);

function toggle() {
    // To hide errors thrown by reactDOM as Ic is already declared
    // console.clear();
    console.log("Content script loaded!")

    // THIS IS TO STORE THE NOTE IN STORAGE
    // DO NOT REMOVE THIS
    
    // chrome.storage.local.set({key: 5}, function() {
    //     console.log('Store is set to ' + 5);
    // // });
    // chrome.storage.local.get(['key'], function(result) {
    //     console.log(result)
    //     console.log('Store currently is ' + result.key);
    // });


    const installedApp = document.getElementById('note-chrome-extension-app')
    if (installedApp) {
        installedApp.remove()
    } else {
        document.body.appendChild(app)
    }
}
