import styles from './styles'
import { useState } from 'react'

export default function Controls() {

    // Used in hover styles to modify opacity
    const [saveIconOpacity, setSaveIconOpacity] = useState(0.6)
    const [deleteIconOpacity, setDeleteIconOpacity] = useState(0.6)



    // FEATURES IMPLEMENTATION
    // ============================



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
            {/*  =========== Bottom left message ===========  */}
            <div className='chromenote-controls_left'>
                <span style={styles.collapse}>...</span>
            </div>

            {/* ================= Controls ================== */}
            <div className='chromenote-controls' style={styles.controls}>
                <span style={styles.controls_btn} onMouseEnter={handleSaveMouseEnter} onMouseLeave={handleSaveMouseLeave}>
                    <svg style={styles.controls_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g opacity={saveIconOpacity} style={styles.controls_svg_save}>
                            <path d="M26.666 35V29C26.666 27.1144 26.666 26.1716 26.0802 25.5858C25.4944 25 24.5516 25 22.666 25H15.666C13.7804 25 12.8376 25 12.2518 25.5858C11.666 26.1716 11.666 27.1144 11.666 29V35" stroke="#33363F" strokeWidth="3" />
                            <path d="M11.666 13.3335H19.9993" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 11C5 8.17157 5 6.75736 5.87868 5.87868C6.75736 5 8.17157 5 11 5H27.5049C27.9137 5 28.118 5 28.3018 5.07612C28.4856 5.15224 28.6301 5.29676 28.9191 5.58579L34.4142 11.0809C34.7032 11.3699 34.8478 11.5144 34.9239 11.6982C35 11.882 35 12.0863 35 12.4951V29C35 31.8284 35 33.2426 34.1213 34.1213C33.2426 35 31.8284 35 29 35H11C8.17157 35 6.75736 35 5.87868 34.1213C5 33.2426 5 31.8284 5 29V11Z" stroke="#33363F" strokeWidth="3" />
                        </g>
                    </svg>
                </span>

                <span style={styles.controls_btn} onMouseEnter={handleDeleteMouseEnter} onMouseLeave={handleDeleteMouseLeave}>
                    <svg style={styles.controls_icon} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity={deleteIconOpacity} style={styles.controls_svg}>
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
