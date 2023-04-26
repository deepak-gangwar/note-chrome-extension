import styles from './styles'
import { useContext } from 'react'
import { TotalNotesContext } from '../../../Panel'

export default function Export() {
    const { currentList } = useContext(TotalNotesContext)

    // CONVERT ALL NOTES TO A SINGLE STRING
    // ====================================

    function getAllNotes() {
        let allNotes = "NOTES :- "
        currentList.forEach(item => {
            allNotes = allNotes + '\n\n' + item.note
        })
        return allNotes
    }


    // COPY TO CLIPBOARD UTILITY
    // =========================

    function copyToClipboardAsync(str) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str)
        return Promise.reject('The Clipboard API is not available.')
    }

    const copyNote = () => {
        copyToClipboardAsync(getAllNotes())
    }

    function handleExportToClipboard() {
        copyNote()
    }

    function handleExportToGoogleDoc() {
        copyNote()
    }


    /////////THIS IS FOR DOWNLOADING NOTE IN PDF FORM LEAVE IT FOR NOW
    //================================================================

    // function downloadAsPDF(allNotes) {

    //     downloadFileObject(allNotes);
    //     if (allNotes.startsWith("JVB")) {
    //         allNotes = "data:application/pdf;base64," + allNotes;
    //     } else if (allNotes.startsWith("data:application/pdf;base64")) {
    //         downloadFileObject(allNotes);
    //     } else {
    //         alert("Not a valid Base64 PDF string. Please check");
    //     }

    // }
    // function downloadFileObject(allNotes) {
    //     const linkSource = allNotes;
    //     const downloadLink = document.createElement("a");
    //     const fileName = "note.pdf";
    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    // }




    function downloadTxtFile(text) {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'txt/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myNotes.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    function handleExportToTXT() {
        // downloadAsPDF(getAllNotes())
        downloadTxtFile(getAllNotes())
    }

    return (
        <ul style={styles.export_menu}>
            <li style={styles.menu_item}>
                <div onClick={handleExportToClipboard}>
                    Copy to Clipboard
                </div>
            </li>
            <li style={styles.menu_item}>
                <a style={styles.menu_item_a} onClick={handleExportToGoogleDoc} href="https://doc.new" target='_blank' rel='noreferrer'>
                    Open Google Doc to Save
                </a>
            </li>
            <li style={styles.menu_item}>
                <div onClick={handleExportToTXT}>
                    Export as TXT
                </div>
            </li>
            <div style={styles.pin}>
                <svg style={styles.pin_svg} width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.164 22.8558C16.0451 25.0163 12.9549 25.0163 11.836 22.8558L5.40489e-07 -6.27912e-07L29 1.90735e-06L17.164 22.8558Z" fill="#232323" />
                </svg>
            </div>
        </ul>
    )
}
