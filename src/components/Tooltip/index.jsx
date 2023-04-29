import styles from './styles'
import { useEffect } from 'react'

export default function Tooltip() {

    useEffect(() => {
        function handleSelectedText() {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText !== '') {
                console.log(selectedText);
            }
        }

        document.addEventListener('mouseup', handleSelectedText);
        return () => {
            document.removeEventListener('mouseup', handleSelectedText);
        }
    }, []);

    // work only when clicking on add to note
    function addToNote() {

    }

    return (
        <button onClick = {addToNote} style={styles.tooltip}>Add note</button>
    )
}
