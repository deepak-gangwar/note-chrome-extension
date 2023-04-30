import styles from './styles'
import Editor from './Editor'
import { useState, useContext, useRef, useEffect } from 'react'
import { TotalNotesContext } from '../Panel'


export default function Note({ myItem, activeValue, changeStatesInParent }) {
    const content = myItem.note
    const inputDiv = useRef(null)

    const [isEditable, setEditable] = useState(false)
    const [inputValue, setInputValue] = useState(content)
    const [componentStyles, setComponentStyles] = useState({ ...styles.note_wrap })

    const { currentList } = useContext(TotalNotesContext);

    // HOVER STYLES
    // ============

    function handleNoteMouseEnter() {
        makeNoteColorLight()
    }

    function handleNoteMouseLeave() {
        makeNoteColorDark()
    }

    function makeNoteColorLight() {
        if (!activeValue) setComponentStyles({ ...styles.note_wrap, background: "#c7c1db", cursor: "pointer" })
    }

    function makeNoteColorDark() {
        if (!activeValue) setComponentStyles({ ...styles.note_wrap })
    }

    useEffect(() => {
        makeNoteColorDark()
        if(!isEditable){
            // make active note light colored
            if(activeValue) setComponentStyles({ ...styles.note_wrap, background: "#ddd7f0", cursor: "default" })
        } else {
            if(!activeValue){
                setEditable(false)
                makeNoteColorDark()
            }
        }
    }, [activeValue])
    
    // TOGGLE CRUD EDITOR
    // ==================

    function activateCrudEditor() {
        // modify the parent state
        if (!isEditable) changeStatesInParent(myItem.id)
    }

    // CRUD FEATURES IMPLEMENTATION
    // ============================

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

            {/* ================= Wrapper ================== */}

            <div id="note" className='textContentNote' style={styles.content_wrap} onClick={activateCrudEditor}>
                <div
                    ref={inputDiv}
                    onInput={e => setInputValue(e.currentTarget.textContent)}
                    spellCheck={false}
                    suppressContentEditableWarning={true}
                    contentEditable={isEditable}
                    className='chromenote-note_content'
                    style={styles.note_content}
                >
                    {content}
                </div>
            </div>

            {/* =================== Editor =================== */}

            {activeValue ? <Editor handleEditClick={editNote} content={content} /> : ''}
        </div>
    )
}
