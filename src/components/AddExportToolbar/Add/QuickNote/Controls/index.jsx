import styles from './styles'
import { useEffect, useState } from 'react'

export default function Controls({ hintPrompt, onSave, onDelete }) {

    // Used in hover styles to modify opacity
    const [saveIconOpacity, setSaveIconOpacity] = useState(0.6)
    const [deleteIconOpacity, setDeleteIconOpacity] = useState(0.6)
    const [promptMsg, setPromptMsg] = useState(hintPrompt)

    // FEATURES IMPLEMENTATION
    // ============================

    function saveQuickNote() {
        onSave()
        setPromptMsg(hintPrompt)
    }

    function deleteQuickNote() {
        onDelete()
    }

    useEffect(() => {
        setPromptMsg(hintPrompt)
    },[hintPrompt])

    // HANDLE HOVER STYLES FOR EDITOR ICONS
    // ====================================

    function handleSaveMouseEnter() {
        setSaveIconOpacity(1)
    }

    function handleSaveMouseLeave() {
        setSaveIconOpacity(0.6)
    }

    function handleDeleteMouseEnter() {
        setDeleteIconOpacity(1)
    }

    function handleDeleteMouseLeave() {
        setDeleteIconOpacity(0.6)
    }


    return (
        <div className='chromenote-noteEditor' style={styles.noteEditor}>
            <div className='chromenote-controls_left'>
                <span style={styles.collapse}>{promptMsg}</span>
            </div>

            {/* ================= Controls ================== */}
            <div className='chromenote-controls' style={styles.controls}>
                <span onClick={saveQuickNote} style={styles.controls_btn} onMouseEnter={handleSaveMouseEnter} onMouseLeave={handleSaveMouseLeave}>
                    <svg style={styles.controls_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g opacity={saveIconOpacity} style={styles.controls_svg_save}>
                            <path d="M26.666 35V29C26.666 27.1144 26.666 26.1716 26.0802 25.5858C25.4944 25 24.5516 25 22.666 25H15.666C13.7804 25 12.8376 25 12.2518 25.5858C11.666 26.1716 11.666 27.1144 11.666 29V35" stroke="#33363F" strokeWidth="3" />
                            <path d="M11.666 13.3335H19.9993" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11C5 8.17157 5 6.75736 5.87868 5.87868C6.75736 5 8.17157 5 11 5H27.5049C27.9137 5 28.118 5 28.3018 5.07612C28.4856 5.15224 28.6301 5.29676 28.9191 5.58579L34.4142 11.0809C34.7032 11.3699 34.8478 11.5144 34.9239 11.6982C35 11.882 35 12.0863 35 12.4951V29C35 31.8284 35 33.2426 34.1213 34.1213C33.2426 35 31.8284 35 29 35H11C8.17157 35 6.75736 35 5.87868 34.1213C5 33.2426 5 31.8284 5 29V11Z" stroke="#33363F" strokeWidth="3" />
                        </g>
                    </svg>
                </span>

                <span onClick={deleteQuickNote} style={styles.controls_btn} onMouseEnter={handleDeleteMouseEnter} onMouseLeave={handleDeleteMouseLeave}>
                    <svg style={styles.controls_svg_cancel} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity={deleteIconOpacity}>
                            <path opacity="0.8" d="M15 5L5 15" stroke="#33363F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path opacity="0.8" d="M5 5L15 15" stroke="#33363F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>

                </span>
            </div>
        </div>
    )
}
