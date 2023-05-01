import styles from './styles'
import Editor from './Editor'
import { useState, useContext, useRef, useEffect } from 'react'
import { TotalNotesContext } from '../Panel'


export default function Note({ myItem, activeValue, changeStatesInParent }) {
    const content = myItem.note
    const inputDiv = useRef(null)

    const [isEditable, setEditable] = useState(false)
    const [inputValue, setInputValue] = useState(content)
    const [truncatedContent, setTruncatedContent] = useState(content)
    const [componentStyles, setComponentStyles] = useState({ ...styles.note_wrap })
    const [contentStyles, setContentStyles] = useState({ ...styles.note_content })

    const { StoredNotes } = useContext(TotalNotesContext);

    // TRUNCATE NOTE LENGTH
    // ====================

    function truncateText() {
        let str = content.substring(0, 120) + "..."
        setTruncatedContent(str)
    }

    useEffect(() => {
        if (!activeValue) {
            // do it only for notes longer than three lines
            if (myItem.note.length > 120) {
                truncateText()
                setContentStyles({
                    ...styles.note_content,
                    background: "-webkit-linear-gradient(#232323, transparent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                })
            }
        } else {
            setContentStyles({ ...styles.note_content })
        }

    }, [activeValue])


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
        if (!isEditable) {
            // make active note light colored
            if (activeValue) setComponentStyles({ ...styles.note_wrap, background: "#ddd7f0", cursor: "default" })
        } else {
            if (!activeValue) {
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
        var foundIndex = StoredNotes.findIndex(x => x.id == myItem.id)
        StoredNotes[foundIndex].note = inputValue
        window.localStorage.setItem("chromenote-Store", JSON.stringify(StoredNotes))
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
                    style={contentStyles}
                >
                    {activeValue ? content : truncatedContent}
                </div>
            </div>

            {/* =================== Editor =================== */}

            {activeValue ? <Editor handleEditClick={editNote} content={content} /> : ''}
        </div>
    )
}
