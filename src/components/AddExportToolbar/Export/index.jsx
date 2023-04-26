import styles from './styles'
import { useContext, useState, useRef } from 'react'
import { TotalNotesContext } from '../../Panel'
import ExportMenu from './ExportMenu'

export default function Export() {
    const menu = useRef(null)
    const [panelIsClicked, setPanelIsClicked] = useState(false)
    const { currentList } = useContext(TotalNotesContext)
    const [isActive, setIsActive] = useState(false)

    function copyToClipboardAsync(str) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str)
        return Promise.reject('The Clipboard API is not available.')
    }

    const copyNote = () => {
        let allNotes = "NOTE :- "
        currentList.forEach(item => {
            allNotes = allNotes + '\n\n' + item.note
        })
        copyToClipboardAsync(allNotes)
        // copyMsg()
        // setIsCopied(true)
        // setTimeout(() => {
        //     setIsCopied(false)
        // }, 1500)
    }

    function handleExportButtonClick() {
        setIsActive(!isActive)
    }

    return (
        <div onmouse>
            <button  onClick = {handleExportButtonClick}  style={styles.export_btn}>
                Export
            </button>
            {isActive ? <ExportMenu /> : "" }
        </div>


    )
}
