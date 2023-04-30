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
                <svg style={styles.export_icon_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7V7C14 6.06812 14 5.60218 13.8478 5.23463C13.6448 4.74458 13.2554 4.35523 12.7654 4.15224C12.3978 4 11.9319 4 11 4H8C6.11438 4 5.17157 4 4.58579 4.58579C4 5.17157 4 6.11438 4 8V11C4 11.9319 4 12.3978 4.15224 12.7654C4.35523 13.2554 4.74458 13.6448 5.23463 13.8478C5.60218 14 6.06812 14 7 14V14" stroke="#f5f5f5" strokeWidth="2" />
                    <rect x="10" y="10" width="10" height="10" rx="2" stroke="#f5f5f5" strokeWidth="2" />
                </svg>
            </li>
            <li style={styles.menu_item}>
                <a style={styles.menu_item_a} onClick={handleExportToGoogleDoc} href="https://doc.new" target='_blank' rel='noreferrer'>
                    Open Google Doc to Save
                </a>
                <svg style={styles.export_icon_docs} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2V7L12 7.05441C11.9999 7.47848 11.9998 7.8906 12.0455 8.23052C12.097 8.61372 12.2226 9.051 12.5858 9.41421C12.949 9.77743 13.3863 9.90295 13.7695 9.95447C14.1094 10.0002 14.5215 10.0001 14.9456 10H14.9456H14.9456H14.9456L15 10H20V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H12ZM14 2.00462V7C14 7.49967 14.0021 7.77383 14.0277 7.96402L14.0287 7.97131L14.036 7.97231C14.2262 7.99788 14.5003 8 15 8H19.9954C19.9852 7.58836 19.9525 7.31595 19.8478 7.06306C19.6955 6.69552 19.4065 6.40649 18.8284 5.82843L16.1716 3.17157C15.5935 2.59351 15.3045 2.30448 14.9369 2.15224C14.684 2.04749 14.4116 2.01481 14 2.00462ZM8 13C8 12.4477 8.44772 12 9 12L15 12C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14L9 14C8.44772 14 8 13.5523 8 13ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z" fill="#F5F5F5" />
                </svg>
                {/* <svg style={styles.export_icon_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z" stroke="#f5f5f5" strokeWidth="2" />
                    <path d="M9 13L15 13" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 17L13 17" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" />
                    <path d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19" stroke="#f5f5f5" strokeWidth="2" />
                </svg> */}
            </li>
            <li style={styles.menu_item}>
                <div onClick={handleExportToTXT}>
                    Export as TXT
                </div>
                <svg style={styles.export_icon_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z" fill="#f5f5f5" />
                    <path d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16" stroke="#f5f5f5" strokeWidth="2" />
                </svg>
            </li>
            <div style={styles.pin}>
                <svg style={styles.pin_svg} width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.164 22.8558C16.0451 25.0163 12.9549 25.0163 11.836 22.8558L5.40489e-07 -6.27912e-07L29 1.90735e-06L17.164 22.8558Z" fill="#232323" />
                </svg>
            </div>
        </ul>
    )
}
