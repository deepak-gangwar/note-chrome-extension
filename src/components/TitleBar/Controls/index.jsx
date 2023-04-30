import Close from './Close'
import Minimize from './Minimize'
import { useState } from 'react'
import Resize from './Resize';

var styles = {
    controls: {
        WebkitUserSelect: 'none',
        userSelect: 'none',
        cursor: 'default',
        display: 'flex',
        width: '61px',
        position: 'absolute'
    },

    inset: {
        marginLeft: '5px'
    }
};

export default function Controls() {
    const [isOver, setIsOver] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    function handleClose() {
        console.log('Close window')
        document.getElementById('note-chrome-extension-app').remove()
        setIsOver(false)
    }

    function handleMinimize() {
        console.log('Minimize window')

        const app = document.getElementById('note-chrome-extension-app')
        const panel = app.querySelector('.chromenote-panel')
        const nav = panel.querySelector('.chromenote-navbar')
        const search = panel.querySelector('.chromenote-search')
        const list = panel.querySelector('.chromenote-notes_list')
        const addExport = panel.querySelector('.chromenote-bottom_toolbar')

        if (!isMinimized) {
            setIsMinimized(!isMinimized)

            // Remove unnecessary UI from the DOM
            // search.remove()
            // list.remove()
            // addExport.remove()

            // Hide them rather than removing because appendChild is not working as such
            search.style.opacity = list.style.opacity = addExport.style.opacity = "0"
            search.style.height = list.style.height = addExport.style.height = "0"
            search.style.width = list.style.width = addExport.style.width = "0"
            search.style.padding = addExport.style.padding = "0"

            // Update the CSS Styles
            panel.style.height = panel.style.width = "auto"
            panel.style.top = ""
            panel.style.bottom = "20px"
            nav.style.marginBottom = "1rem"
        } else {
            setIsMinimized(!isMinimized)

            // Add the UI back to the DOM
            // app.appendChild(search)
            // app.appendChild(list)
            // app.appendChild(addExport)

            // Show the UI again
            list.style.height = "340px"
            search.style.height = addExport.style.height = ""
            search.style.width = list.style.width = addExport.style.width = ""
            search.style.opacity = list.style.opacity = addExport.style.opacity = "1"
            search.style.padding = addExport.style.padding = "1rem 2.5rem 0.8rem"

            // Update the CSS Styles
            panel.style.height = "550px"
            panel.style.width = "410px"
            panel.style.top = "20px"
            panel.style.bottom = ""
            nav.style.marginBottom = ""
        }

    }

    function handleResize() {
        console.log('Resize window')
    }

    return (
        <div style={styles.controls} onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <Close onMouseClick={handleClose} showIcon={isOver} />
            <Minimize onMouseClick={handleMinimize} showIcon={isOver} />
            <Resize onMouseClick={handleResize} showIcon={isOver} />
        </div>
    )
}
