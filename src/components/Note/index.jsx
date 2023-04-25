import styles from './styles'

export default function Note({ content }) {

    return (
        <div className='chromenote-note_wrap' style={styles.note_wrap}>
            <p className='chromenote-note_content' style={styles.note_content}>{content}</p>
        </div>
    );
}

