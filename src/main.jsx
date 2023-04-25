import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

const app = document.createElement('div')
app.setAttribute('id', 'note-chrome-extension-app')
document.body.appendChild(app)

ReactDOM.createRoot(document.getElementById('note-chrome-extension-app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
