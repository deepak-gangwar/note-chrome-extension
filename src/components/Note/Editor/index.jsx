import styles from './styles'
import { useRef } from 'react'
import { useContext } from 'react';
import { TotalNotesContext } from '../../Panel';




export default function Editor({content}) {

    const {currentList, updateCurrentList} = useContext(TotalNotesContext);

    const copyBtn = useRef(null)

    function copyToClipboardAsync(str) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.reject('The Clipboard API is not available.');
    };

    const copyNote = () => {
        copyToClipboardAsync(content);

        copyBtn.current.textContent = "Copied"
        setTimeout(() => {
            copyBtn.current.textContent = "Copy"
        }, 1000)
    }

    const editNote = () => {}


    const deleteNote = () => {
        let index,count = 0;
        currentList.forEach((item) => {
            if(item.note === content) {
                index = count
            }
            count++
        })

        currentList.splice(index, 1)
        // setCurrentList(currentList)
        console.log(currentList)
        // handler()
        updateCurrentList(currentList)
    }


    return (
        <div className='chromenote-noteEditor' style = {styles.noteEditor}>
            <div>
                <span> Click to Collapse</span>
            </div>
            <div style = {styles.controls}>

                <span ref={copyBtn} onClick = {copyNote}> copy</span>
                <span onClick = {editNote}> Edit</span>
                <span onClick = {deleteNote}> Delete</span>
            </div>
        </div>
    );
}

