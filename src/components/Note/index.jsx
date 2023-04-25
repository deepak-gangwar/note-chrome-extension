import styles from './styles'

export default function Note({ content }) {

  return (
    <div className='chromenote-note_wrap' style={styles.note_wrap}>
      <p>{content}</p>
    </div>
  );
}

