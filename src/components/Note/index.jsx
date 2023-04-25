import styles from './styles'
import Editor from './Editor'
import { useState } from 'react'


export default function Note({ content }) {
    const [isEditorVisible, setIsEditorVisible] = useState(true)
    const [text, setText] = useState(content);
    const [isEditable, setEditable] = useState(false)

    const componentStyles = { ...styles.note_wrap }

    
    function expandNote() {
        setIsEditorVisible(isEditorVisible)
    }

    function editNote() {
        console.log("editing is started")
        setEditable(!isEditable)
    }


    return (
        <div className='chromenote-note_wrap' style={componentStyles} onClick={expandNote}>
            <div contentEditable = {isEditable} className='chromenote-note_content' style={styles.note_content}>{text}</div >
            {isEditorVisible ? <Editor onClickEdit = {editNote} content={content} /> : ''}
        </div>
    );
}

