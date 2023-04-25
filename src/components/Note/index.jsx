import styles from './styles'
import Editor from './Editor'
import { useState } from 'react'


export default function Note({ content}) {
    const [isEditorVisible, setIsEditorVisible] = useState(false)

    function makeEditable() {
        setIsEditorVisible(!isEditorVisible)
    }

    return (
        <div className='chromenote-note_wrap' style={styles.note_wrap} onClick={makeEditable}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
            { isEditorVisible ? <Editor content = {content}/> : ''}
        </div>
    );
}

