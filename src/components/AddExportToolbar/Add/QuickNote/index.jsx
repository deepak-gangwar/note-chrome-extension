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

    return (
        <div style={styles.quicknote_wrap}>
            <textarea onChange={(e) => setInputText(e.target.value)} style={styles.textarea} type="text" />
            <Controls onSave={handleSave} onDelete={handleDelete} />
        </div>
    )
}
