import styles from './styles'
import Editor from './Editor'
import { useState, useContext, useRef } from 'react'
import { TotalNotesContext } from '../Panel';


export default function Note({ myItem }) {
    const content = myItem.note
    const inputDiv = useRef(null)

    const [isEditable, setEditable] = useState(false)
    const [inputValue, setInputValue] = useState(content)
    const [isNoteActive, setIsNoteActive] = useState(false)
    const [componentStyles, setComponentStyles] = useState({ ...styles.note_wrap })

    const { currentList } = useContext(TotalNotesContext);

    // FOR HOVER STYLES
    function handleNoteMouseEnter() {
        makeNoteColorLight()
    }

    function handleNoteMouseLeave() {
        makeNoteColorDark()
    }

    function makeNoteColorLight() {
        if (!isNoteActive) setComponentStyles({ ...styles.note_wrap, background: "#c7c1db", cursor: "pointer" })
    }

    function makeNoteColorDark() {
        if (!isNoteActive) setComponentStyles({ ...styles.note_wrap })
    }

    function makeEditable() {
        if (!isEditable) {
            setIsNoteActive(!isNoteActive)

            // CHANGE COLOR OF ACTIVE NOTE
            if (isNoteActive) {
                setComponentStyles({ ...styles.note_wrap })
            } else {
                setComponentStyles({ ...styles.note_wrap, background: "#ddd7f0", cursor: "default" })
            }
        }
    }

    function editNote(saveMsg) {
        setEditable(!isEditable)
        if (isEditable) saveEditedNote(myItem, saveMsg)
        // Not working (tried - on clicking edit, div is focused so you don't have to click)
        // inputDiv.current.focus()
    }

    function saveEditedNote(myItem, saveMsg) {
        var foundIndex = currentList.findIndex(x => x.id == myItem.id)
        currentList[foundIndex].note = inputValue
        saveMsg()
    }

    return (
        <div className='chromenote-note_wrap' style={componentStyles} onMouseEnter={handleNoteMouseEnter} onMouseLeave={handleNoteMouseLeave}>
            <div style={styles.content_wrap} onClick={makeEditable}>
                <div ref={inputDiv} onInput={e => setInputValue(e.currentTarget.textContent)} spellCheck={false} suppressContentEditableWarning={true} contentEditable={isEditable} className='chromenote-note_content' style={styles.note_content}>{content}</div >
            </div>
            {isNoteActive ? <Editor onClickEdit={editNote} content={content} /> : ''}
        </div>
    );
}

