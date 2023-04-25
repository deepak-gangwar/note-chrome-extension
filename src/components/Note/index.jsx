import styles from './styles'
import Editor from './Editor'
import { useState, useContext, useRef } from 'react'
import { TotalNotesContext } from '../Panel';


export default function Note({ myItem }) {
    const content = myItem.note
    const inputDiv = useRef(null)
    const [isEditorVisible, setIsEditorVisible] = useState(true)
    const [text, setText] = useState(content);
    const [isEditable, setEditable] = useState(false)
    const [inputValue, setInputValue] = useState(content)

    const { currentList } = useContext(TotalNotesContext);

    const componentStyles = { ...styles.note_wrap }


    function expandNote() {
        setIsEditorVisible(isEditorVisible)
    }

    function editNote() {
        setEditable(!isEditable)
        saveEditedNote(myItem)
    }

    function saveEditedNote(myItem) {
        var foundIndex = currentList.findIndex(x => x.id == myItem.id);
        currentList[foundIndex].note = inputValue;
    }

    return (
        <div className='chromenote-note_wrap' style={componentStyles} onClick={expandNote}>
            <div ref={inputDiv} onInput={e => setInputValue(e.currentTarget.textContent)} contentEditable = {isEditable} className='chromenote-note_content' style={styles.note_content}>{text}</div >
            {isEditorVisible ? <Editor onClickEdit = {editNote} content={content} /> : ''}
        </div>
    );
}

