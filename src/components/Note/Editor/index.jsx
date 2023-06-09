import styles from './styles'
import { useRef } from 'react'
import { useState, useContext } from 'react'
import { TotalNotesContext } from '../../Panel'


export default function Editor({ content, handleEditClick, closeEditor }) {
    const { currentList, updateCurrentList } = useContext(TotalNotesContext)

    // Used in hover styles to modify opacity
    const [copyIconOpacity, setCopyIconOpacity] = useState(0.6)
    const [editIconOpacity, setEditIconOpacity] = useState(0.6)
    const [deleteIconOpacity, setDeleteIconOpacity] = useState(0.6)

    // Used to switch between two icons
    const [isEditing, setIsEditing] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    // Used to change the message on bottom left corner when action is performed
    const msg = useRef(null)


    // CRUD FEATURES IMPLEMENTATION
    // ============================

    // Copy to clipboard ----------------------------------------------------

    function copyToClipboardAsync(str) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str)
        return Promise.reject('The Clipboard API is not available.')
    }

    const copyNote = () => {
        copyToClipboardAsync(content)
        copyMsg()
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1500)
    }

    // Edit -----------------------------------------------------------------

    const editNote = () => {
        if (!isEditing) editMsg()
        handleEditClick(saveMsg)
        setIsEditing(!isEditing)
    }


    // Delete ---------------------------------------------------------------

    const deleteNote = () => {
        updateCurrentList(content)
    }

    // MESSAGES
    // ========

    function editMsg() {
        msg.current.textContent = "Edit mode on"

        // tried to add try and catch block but didn't worked
        try {
            setTimeout(() => { msg.current.textContent = "Click to collapse" }, 1500)
        } catch (error) {
            if (error instanceof TypeError) {
                console.log("everything good")
            } else {
                console.log("h")
            }
        }
    }

    function saveMsg() {
        msg.current.textContent = "Saved"
        setTimeout(() => { msg.current.textContent = "Click to collapse" }, 1500)
    }

    function copyMsg() {
        msg.current.textContent = "Copied to clipboard!"
        setTimeout(() => { msg.current.textContent = "Click to collapse" }, 1500)
    }

    function handleKeyPress(event) {
        if (event.key === "Escape" || event.key == "Enter") {
            closeEditor()
        }
        if (event.key === "Delete") {
            deleteNote()
        }
    }

    // HANDLE HOVER STYLES FOR EDITOR ICONS
    // ====================================

    function handleCopyMouseEnter() {
        setCopyIconOpacity(1)
    }

    function handleCopyMouseLeave() {
        setCopyIconOpacity(0.6)
    }

    function handleEditMouseEnter() {
        setEditIconOpacity(1)
    }

    function handleEditMouseLeave() {
        setEditIconOpacity(0.6)
    }

    function handleDeleteMouseEnter() {
        setDeleteIconOpacity(1)
    }

    function handleDeleteMouseLeave() {
        setDeleteIconOpacity(0.6)
    }

    // COPY AND EDIT ICONS
    // ===================

    let editIcon = isEditing ? (
        <svg style={styles.editor_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <g opacity={editIconOpacity} style={styles.editor_svg_save}>
                <path d="M26.666 35V29C26.666 27.1144 26.666 26.1716 26.0802 25.5858C25.4944 25 24.5516 25 22.666 25H15.666C13.7804 25 12.8376 25 12.2518 25.5858C11.666 26.1716 11.666 27.1144 11.666 29V35" stroke="#33363F" strokeWidth="3" />
                <path d="M11.666 13.3335H19.9993" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                <path d="M5 11C5 8.17157 5 6.75736 5.87868 5.87868C6.75736 5 8.17157 5 11 5H27.5049C27.9137 5 28.118 5 28.3018 5.07612C28.4856 5.15224 28.6301 5.29676 28.9191 5.58579L34.4142 11.0809C34.7032 11.3699 34.8478 11.5144 34.9239 11.6982C35 11.882 35 12.0863 35 12.4951V29C35 31.8284 35 33.2426 34.1213 34.1213C33.2426 35 31.8284 35 29 35H11C8.17157 35 6.75736 35 5.87868 34.1213C5 33.2426 5 31.8284 5 29V11Z" stroke="#33363F" strokeWidth="3" />
            </g>
        </svg>
    ) : (
        <svg style={styles.editor_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <g opacity={editIconOpacity} style={styles.editor_svg}>
                <path d="M7.44014 32.5605L7.44015 32.5605C7.96829 33.0887 8.61115 33.0718 8.8698 33.0465C9.08942 33.025 9.32962 32.9643 9.46972 32.929C9.4828 32.9257 9.495 32.9226 9.50624 32.9198L14.827 31.5896C14.8442 31.5853 14.8629 31.5807 14.8828 31.5758C15.0832 31.5269 15.4152 31.4458 15.7212 31.2725C16.0271 31.0993 16.2675 30.8564 16.4125 30.7097C16.427 30.6951 16.4405 30.6815 16.453 30.6689L29.6471 17.4749L28.5864 16.4142L29.6471 17.4749C29.6633 17.4587 29.6795 17.4425 29.6959 17.4261C29.986 17.1362 30.2998 16.8227 30.529 16.5223C30.7974 16.1704 31.0864 15.6669 31.0864 15C31.0864 14.3331 30.7974 13.8296 30.529 13.4777C30.2998 13.1773 29.986 12.8638 29.6958 12.5738C29.6795 12.5575 29.6632 12.5413 29.6471 12.5251L27.4755 10.3536C27.4594 10.3374 27.4431 10.3212 27.4268 10.3048C27.1369 10.0146 26.8233 9.70085 26.523 9.47168C26.1711 9.20321 25.6676 8.91421 25.0007 8.91421C24.3337 8.91421 23.8302 9.20321 23.4783 9.47168C23.178 9.70085 22.8644 10.0146 22.5745 10.3048C22.5582 10.3212 22.5419 10.3374 22.5258 10.3536L9.33171 23.5476C9.31917 23.5602 9.30552 23.5737 9.29091 23.5881C9.14427 23.7332 8.90134 23.9736 8.72812 24.2795L10.0334 25.0185L8.72811 24.2795C8.55489 24.5854 8.47378 24.9174 8.42482 25.1178C8.41994 25.1378 8.41538 25.1564 8.41108 25.1736L7.08088 30.4944C7.07807 30.5057 7.07499 30.5179 7.07168 30.531C7.03631 30.6711 6.97568 30.9112 6.95419 31.1308C6.92889 31.3895 6.912 32.0324 7.44014 32.5605Z" stroke="#33363F" strokeWidth="3" />
                <path d="M20.834 12.4998L25.834 9.1665L30.834 14.1665L27.5007 19.1665L20.834 12.4998Z" fill="#33363F" />
            </g>
        </svg>
    )

    let copyIcon = isCopied ? (
        <svg style={styles.editor_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity={copyIconOpacity} style={styles.editor_svg_tick}>
                <path d="M8.33333 23.3333L14.2331 27.7581C14.6618 28.0797 15.2677 28.0061 15.607 27.5914L30 10" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
            </g>
        </svg>
    ) : (
        <svg style={styles.editor_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity={copyIconOpacity} style={styles.editor_svg}>
                <path d="M23.3327 11.6665V10.6665C23.3327 8.78089 23.3327 7.83808 22.7469 7.25229C22.1611 6.6665 21.2183 6.6665 19.3327 6.6665H10.666C8.7804 6.6665 7.83759 6.6665 7.2518 7.25229C6.66602 7.83808 6.66602 8.78089 6.66602 10.6665V19.3332C6.66602 21.2188 6.66602 22.1616 7.2518 22.7474C7.83759 23.3332 8.7804 23.3332 10.666 23.3332H11.666" stroke="#33363F" strokeWidth="3" />
                <rect x="16.666" y="16.6665" width="16.6667" height="16.6667" rx="2" stroke="#33363F" strokeWidth="3" />
            </g>
        </svg>
    )

    return (
        <div className='chromenote-noteEditor' tabIndex="0" onKeyUp={handleKeyPress} style={styles.noteEditor}>
            {/*  =========== Bottom left message ===========  */}
            <div className='chromenote-editor_left'>
                <span ref={msg} style={styles.collapse}>Click to Collapse</span>
            </div>

            {/* ================= Controls ================== */}
            <div className='chromenote-editor_controls' style={styles.editor_controls}>
                <span onClick={copyNote} style={styles.editor_btn} onMouseEnter={handleCopyMouseEnter} onMouseLeave={handleCopyMouseLeave}>
                    {copyIcon}
                </span>
                <span onClick={editNote} style={styles.editor_btn} onMouseEnter={handleEditMouseEnter} onMouseLeave={handleEditMouseLeave}>
                    {editIcon}
                </span>
                <span onClick={deleteNote} style={styles.editor_btn} onMouseEnter={handleDeleteMouseEnter} onMouseLeave={handleDeleteMouseLeave}>
                    <svg style={styles.editor_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity={deleteIconOpacity} style={styles.editor_svg}>
                            <path d="M16.666 25L16.666 20" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M23.334 25L23.334 20" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11.6665H35H34C32.1144 11.6665 31.1716 11.6665 30.5858 12.2523C30 12.8381 30 13.7809 30 15.6665V29.3332C30 31.2188 30 32.1616 29.4142 32.7474C28.8284 33.3332 27.8856 33.3332 26 33.3332H14C12.1144 33.3332 11.1716 33.3332 10.5858 32.7474C10 32.1616 10 31.2188 10 29.3332V15.6665C10 13.7809 10 12.8381 9.41421 12.2523C8.82843 11.6665 7.88562 11.6665 6 11.6665H5Z" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M16.7809 5.61765C16.9708 5.44046 17.3893 5.28388 17.9714 5.17221C18.5536 5.06053 19.2669 5 20.0006 5C20.7344 5 21.4477 5.06053 22.0299 5.17221C22.612 5.28388 23.0305 5.44046 23.2204 5.61765" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    )
}
