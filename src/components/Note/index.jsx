import styles from './styles'
import Editor from './Editor'
import { useState } from 'react'


export default function Note({ content }) {
    const [isNoteActive, setIsNoteActive] = useState(false)
    const [componentStyles, setComponentStyles] = useState({ ...styles.note_wrap })

    function makeEditable() {
        setIsNoteActive(!isNoteActive)

        // CHANGE COLOR OF ACTIVE NOTE
        if (isNoteActive) {
            setComponentStyles({ ...styles.note_wrap })
        } else {
            setComponentStyles({ ...styles.note_wrap, background: "#ddd7f0", cursor: "default" })
        }
    }

    return (
        <div className='chromenote-note_wrap' style={componentStyles} onClick={makeEditable}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
            {isNoteActive ? <Editor content={content} /> : ''}
        </div>
    );
}

