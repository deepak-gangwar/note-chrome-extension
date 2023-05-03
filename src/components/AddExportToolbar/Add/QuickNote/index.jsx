import styles from './styles'
import Controls from './Controls'
import { useState } from 'react'

export default function QuickNote({ saveHandler, disableHandler }) {
    const [inputText, setInputText] = useState('')
    const [promptMsg, setPromptMsg] = useState("...")

    function handleSave() {
        if (inputText.length > 0) {
            saveHandler(inputText)
            disableHandler()
        } else setPromptMsg("Empty Note Can't be Saved")

    }

    function handleDelete() {
        disableHandler()
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            disableHandler()
        } else if (event.ctrlKey && event.key === "Enter") {
            handleSave()
        }
    }

    return (
        <div style={styles.quicknote_wrap}>
            <textarea onKeyUp={handleKeyPress} onChange={(e) => setInputText(e.target.value)} style={styles.textarea} type="text" />
            <Controls onSave={handleSave} onDelete={handleDelete} hintPrompt={promptMsg} />
        </div>
    )
}
