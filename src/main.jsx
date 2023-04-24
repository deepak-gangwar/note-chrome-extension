import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const app = document.createElement('div')
app.setAttribute('id', 'extension-app')
document.body.appendChild(app)

// ReactDOM.createRoot(document.createElement('div')).render(
ReactDOM.createRoot(document.getElementById('extension-app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
