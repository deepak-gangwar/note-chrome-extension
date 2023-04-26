import { useContext, useEffect, useState } from 'react'
import styles from './styles'
import QuickNote from './QuickNote'
import { TotalNotesContext } from '../../Panel'

export default function Add() {
    const [isQuickNoteEnabled, setIsQuickNoteEnabled] = useState(false)

    const { currentList, isBlurScreenActive, addNewNote, activateBlurScreen } = useContext(TotalNotesContext)

    function handleClick() {
        setIsQuickNoteEnabled(true)
        activateBlurScreen(true)
    }
    useEffect(() => {
        if(isQuickNoteEnabled) setIsQuickNoteEnabled(isBlurScreenActive)
    },[isBlurScreenActive])

    
    function handleDisable() {
        setIsQuickNoteEnabled(false)
        activateBlurScreen(false)
    }

    function handleSave(str) {
        const numItems = currentList.length
        const newId = currentList[numItems - 1].id + 1
        const newNote = {
            id: newId,
            note: str
        }
        addNewNote(newNote)
    }

    return (
        <main>
            {/* ============= BUTTON ============= */}

            <div  style={styles.btn_wrap}>
                <button style={styles.add_btn} onClick={handleClick}>
                    <span style={styles.icon}>
                        <svg style={styles.icon_svg} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                                <path d="M8.25 14.5L8.25 2" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                                <path d="M2 8.25H14.5" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            </g>
                        </svg>
                    </span>
                    <span style={styles.label}>Add a new note</span>
                </button>
            </div>

            {/* ========== QUICK NOTE MODAL ========== */}

            {isQuickNoteEnabled ? <QuickNote saveHandler={handleSave} disableHandler={handleDisable} /> : ''}
        </main>
    )
}
