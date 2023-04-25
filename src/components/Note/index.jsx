import styles from './styles'
import Editor from './Editor'
import { useState } from 'react'


export default function Note({ content }) {
    const [isEditorVisible, setIsEditorVisible] = useState(false)

    const componentStyles = { ...styles.note_wrap }

    function makeEditable() {
        setIsEditorVisible(!isEditorVisible)
    }

    return (
        <div className='chromenote-note_wrap' style={componentStyles} onClick={makeEditable}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
            {isEditorVisible ? <Editor content={content} /> : ''}
        </div>
    );
}

