import styles from './styles'
import { useState, useContext, useEffect } from 'react'
import ExportMenu from './ExportMenu'
import { TotalNotesContext } from '../../Panel'
import { ToggleToolbar } from '..'
import { useThemeDetector } from '../../../hooks/useThemeDetector'

export default function Export() {
    const isDarkTheme = useThemeDetector()
    const [componentStyles, setComponentStyles] = useState(isDarkTheme ? { ...styles.export_btn, backgroundColor: "#343739" } : { ...styles.export_btn })

    const [isActive, setIsActive] = useState(false)
    const { isBlurScreenActive, activateBlurScreen } = useContext(TotalNotesContext)
    const { showAddOrExportOnly, updateAddOrExport } = useContext(ToggleToolbar)

    useEffect(() => {
        if (isActive) setIsActive(isBlurScreenActive)
    }, [isBlurScreenActive])

    useEffect(() => {
        if (showAddOrExportOnly === "Add") {
            setIsActive(false)
        }
    }, [showAddOrExportOnly])


    function expandExportOptions() {
        activateBlurScreen(!isActive)
        setIsActive(!isActive)
        updateAddOrExport("Export")
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            setIsActive(false)
            activateBlurScreen(false)
            updateAddOrExport("None")
        }
    }

    // Update component styles whenever isDarkTheme changes, includes change in themes in between usage.
    useEffect(() => {
        setComponentStyles(isDarkTheme ? { ...styles.export_btn, background: "#343739" } : { ...styles.export_btn, background: "rgb(35, 35, 35)" })
    }, [isDarkTheme])

    return (
        <div style={styles.export_wrap}>
            <button onClick={expandExportOptions} onKeyUp={(handleKeyPress)} style={componentStyles}>
                <span>
                    <svg style={styles.export_svg} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2L7.29289 1.29289L8 0.585786L8.70711 1.29289L8 2ZM9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11L9 11ZM2.29289 6.29289L7.29289 1.29289L8.70711 2.70711L3.70711 7.70711L2.29289 6.29289ZM8.70711 1.29289L13.7071 6.29289L12.2929 7.70711L7.29289 2.70711L8.70711 1.29289ZM9 2L9 11L7 11L7 2L9 2Z" fill="#D9D9D9" />
                        <path d="M1 13L1 14C1 15.1046 1.89543 16 3 16L13 16C14.1046 16 15 15.1046 15 14V13" stroke="#D9D9D9" strokeWidth="2" />
                    </svg>
                </span>
                <span style={styles.label}>Export</span>
            </button>
            {isActive ? <ExportMenu /> : ""}
        </div>
    )
}
