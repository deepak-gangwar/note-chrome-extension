import { useContext, useEffect, useState } from 'react'
import styles from './styles'
import QuickNote from './QuickNote'
import { TotalNotesContext } from '../../Panel'
import { ToggleToolbar } from '..'
import { useThemeDetector } from '../../../hooks/useThemeDetector'

export default function Add() {
    const isDarkTheme = useThemeDetector()
    const [btnStyles, setBtnStyles] = useState(isDarkTheme ? { ...styles.add_btn.dark } : { ...styles.add_btn.light })
    const [isQuickNoteEnabled, setIsQuickNoteEnabled] = useState(false)

    const { isBlurScreenActive, addNewNote, activateBlurScreen } = useContext(TotalNotesContext)
    const { showAddOrExportOnly, updateAddOrExport } = useContext(ToggleToolbar)

    function handleClick() {
        setIsQuickNoteEnabled(true)
        activateBlurScreen(true)
        updateAddOrExport("Add")
    }

    useEffect(() => {
        if (isQuickNoteEnabled) setIsQuickNoteEnabled(isBlurScreenActive)
    }, [isBlurScreenActive])

    useEffect(() => {
        if (showAddOrExportOnly === "Export") {
            setIsQuickNoteEnabled(false)
        }
    }, [showAddOrExportOnly])

    function handleDisable() {
        setIsQuickNoteEnabled(false)
        activateBlurScreen(false)
    }

    function handleSave(str) {
        const newId = Math.random().toString(36).slice(2)
        const newNote = {
            id: newId,
            note: str
        }
        addNewNote(newNote)
    }

    // Update component styles whenever isDarkTheme changes, includes change in themes in between usage.
    useEffect(() => {
        setBtnStyles(isDarkTheme ? { ...styles.add_btn.dark } : { ...styles.add_btn.light })
    }, [isDarkTheme])

    return (
        <>
            {/* ============= BUTTON ============= */}

            <div style={styles.btn_wrap}>
                <button style={btnStyles} onClick={handleClick}>
                    <span style={styles.icon}>
                        <svg style={isDarkTheme ? { ...styles.icon_svg, stroke: "#a0a1ac" } : { ...styles.icon_svg, stroke: "#33363F" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                                <path d="M8.25 14.5L8.25 2" strokeWidth="3" strokeLinecap="round" />
                                <path d="M2 8.25H14.5" strokeWidth="3" strokeLinecap="round" />
                            </g>
                        </svg>
                    </span>
                    <span style={isDarkTheme ? { ...styles.label, color: "#a0a1ac" } : { ...styles.label }}>Add a new note</span>
                </button>
            </div>

            {/* ========== QUICK NOTE MODAL ========== */}

            {isQuickNoteEnabled ? <QuickNote saveHandler={handleSave} disableHandler={handleDisable} /> : ''}
        </>
    )
}
