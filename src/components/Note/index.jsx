import styles from './styles'
import Editor from './Editor'
import { useState, useContext } from 'react';
import { TotalNotesContext } from '../Panel/index';



export default function Note({ content, handler}) {
    const [isEditorVisible, setIsEditorVisible] = useState(false)

    const totalNotes = useContext(TotalNotesContext);

    function handleDeleteClick(content, e) {
        handler(content)
    }

    function makeEditable() {
        setIsEditorVisible(!isEditorVisible)
    }

    return (
        <div className='chromenote-note_wrap' style={styles.note_wrap} onClick={makeEditable}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
            { isEditorVisible ? <Editor content = {content}/> : ''}
            <div onClick={(e) => handleDeleteClick(content, e)}>Remove</div>
        </div>
    );
}

