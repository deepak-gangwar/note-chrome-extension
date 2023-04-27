import styles from './styles'
import Controls from './Controls'
import { useState } from 'react'

export default function QuickNote({ saveHandler, disableHandler }) {
    const [inputText, setInputText] = useState('')

    function handleSave() {
        saveHandler(inputText)
        disableHandler()
    }

    function handleDelete() {
        disableHandler()
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            disableHandler()
        }else if(event.ctrlKey && event.key === "Enter") {
            handleSave();
        }
    }

    return (
        <div style={styles.quicknote_wrap}>
            <textarea onKeyDown = {handleKeyPress} onChange={(e) => setInputText(e.target.value)} style={styles.textarea} type="text" />
            <Controls onSave={handleSave} onDelete={handleDelete} />
        </div>
    )
}
