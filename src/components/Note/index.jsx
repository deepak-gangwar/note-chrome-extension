import styles from './styles'
import Editor from './Editor'
import { useContext } from 'react';
import { TotalNotesContext } from '../Panel/index';



export default function Note({ content, noteClickHandler }) {
    const totalNotes = useContext(TotalNotesContext);
    function deleteHandler() {
        console.log('delete is pressed')
    }

    return (
        <div className='chromenote-note_wrap' style={styles.note_wrap} onClick={noteClickHandler}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
            <Editor content = {content} handler={deleteHandler}/>
        </div>
    );
}

