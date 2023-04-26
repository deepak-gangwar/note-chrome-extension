import styles from './styles'
import { useContext } from 'react'
import { TotalNotesContext } from '../../../Panel'

export default function Export({blurHandler, preventBlurHandler}) {

    const { currentList } = useContext(TotalNotesContext);

    //NOTE // function convertAllNotesAsSingleString
    //==============================================
    let allNotes = "NOTE :- "
    currentList.forEach(item => {
        allNotes = allNotes + '\n\n' + item.note
    })


    function copyToClipboardAsync(str) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str)
        return Promise.reject('The Clipboard API is not available.')
    }


    const copyNote = () => {
        copyToClipboardAsync(allNotes)
        // copyMsg()
        // setIsCopied(true)
        // setTimeout(() => {
        //     setIsCopied(false)
        // }, 1500)
    }



    function handleExportToClipboard() {
        console.log(allNotes)
        copyNote();
    }

    function handleExportToGoogleDoc() {
        copyNote();

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
        const file = new Blob([text], {type: 'txt/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myNotes.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    function handleExportToTXT() {
        // downloadAsPDF(allNotes)
        downloadTxtFile(allNotes)
    }

    return (
        <div style={styles.export_btn_expand}>
            <button onClick = {handleExportToClipboard} style={styles.export_btn}>
                Copy to Clipboard
            </button>
            <a href="https://doc.new" target='_blank'>
                <button onClick = {handleExportToGoogleDoc} style={styles.export_btn}>
                    Open Google Doc to Save
                </button>
            </a>
            <button onClick = {handleExportToTXT} style={styles.export_btn}>
                Export as TXT
            </button>
        </div>
    )
}
