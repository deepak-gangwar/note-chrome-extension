import styles from './styles'
import Editor from './Editor'
import { useState, useContext, useRef, useEffect } from 'react'
import { TotalNotesContext } from '../Panel'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export default function Note({ myItem, activeValue, changeStatesInParent }) {
    const content = myItem.note
    const inputDiv = useRef(null)
    let isDarkTheme = useThemeDetector()
    // let componentThemedStyles = isDarkTheme ? { ...styles.note_wrap.dark } : { ...styles.note_wrap.light }

    const [isEditable, setEditable] = useState(false)
    const [inputValue, setInputValue] = useState(content)
    const [truncatedContent, setTruncatedContent] = useState(content)

    const [componentStyles, setComponentStyles] = useState(isDarkTheme ? { ...styles.note_wrap.dark } : { ...styles.note_wrap.light })
    const [contentStyles, setContentStyles] = useState({ ...styles.note_content })

    const { StoredNotes } = useContext(TotalNotesContext);

    // TRUNCATE NOTE LENGTH
    // ====================

    function truncateText() {
        let str = content.substring(0, 120) + "..."
        setTruncatedContent(str)
    }

    function setGradient() {
        // set gradient on the truncated text so it looks blurred out
        setContentStyles(isDarkTheme ?
            {
                ...styles.note_content,
                background: "-webkit-linear-gradient(#e0e0e0, transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }
            : {
                ...styles.note_content,
                background: "-webkit-linear-gradient(#232323, transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }
        )
    }

    useEffect(() => {
        if (!activeValue) {
            // do it only for notes longer than three lines
            if (myItem.note.length > 120) {
                truncateText()
                setGradient()
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
        // HOVER STYLES
        if (!activeValue) setComponentStyles(isDarkTheme ? { ...styles.note_wrap.dark, background: "#303134", cursor: "pointer" } : { ...styles.note_wrap.light, background: "#c7c1db", cursor: "pointer" })
    }

    function makeNoteColorDark() {
        if (!activeValue) setComponentStyles(isDarkTheme ? { ...styles.note_wrap.dark } : { ...styles.note_wrap.light })
    }

    useEffect(() => {
        makeNoteColorDark()
        if (!isEditable) {
            // make active note light colored
            if (activeValue) setComponentStyles(isDarkTheme ? { ...styles.note_wrap.dark, background: "#ebf05e", color: "rgb(14, 15, 17)", cursor: "default" } : { ...styles.note_wrap.light, background: "#ddd7f0", cursor: "default" })
        } else {
            if (!activeValue) {
                setEditable(false)
                makeNoteColorDark()
            }
        }
    }, [activeValue])

    // Update component styles whenever isDarkTheme changes, includes change in themes in between usage.
    useEffect(() => {
        setComponentStyles(isDarkTheme ? { ...styles.note_wrap.dark } : { ...styles.note_wrap.light })
    }, [isDarkTheme])

    // TOGGLE CRUD EDITOR
    // ==================

    function activateCrudEditor() {
        // modify the parent state
        if (!isEditable) changeStatesInParent(myItem.id)
    }

    function closeEditor() {
        changeStatesInParent(myItem.id)
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


    /// currenttly not working work on it
    function handleKeyPress(event) {

        if (event.key === "Escape") {
            if (activeValue) changeStatesInParent(myItem.id)
        }
        if (event.ctrlKey && event.key === "Enter") {
            setEditable(!isEditable)
            var foundIndex = StoredNotes.findIndex(x => x.id == myItem.id)
            StoredNotes[foundIndex].note = inputValue
            window.localStorage.setItem("chromenote-Store", JSON.stringify(StoredNotes))

            changeStatesInParent(myItem.id)
        }
        if (event.key === "Enter") {
            if (!activeValue) changeStatesInParent(myItem.id)
        }
        if (event.key === "Delete") {
            console.log("delete note")
        }



    }

    return (
        <div className='chromenote-note_wrap' style={componentStyles} onMouseEnter={handleNoteMouseEnter} onMouseLeave={handleNoteMouseLeave}>

            {/* ================= Wrapper ================== */}

            <div id="note" className='textContentNote' tabIndex="0" onKeyUp={handleKeyPress} style={styles.content_wrap} onClick={activateCrudEditor}>
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

            {activeValue ? <Editor handleEditClick={editNote} content={content} closeEditor={closeEditor} /> : ''}
        </div>
    )
}
