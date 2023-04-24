import styles from '../styles/Note.module.css'

const styles1 = {
  note_wrap: {
    boxSizing: "border-box",
    width: "calc(100% - 5rem)",
    fontSize: "0.9rem",
    margin: "5px auto",
    padding: "0.1rem 1rem",
    borderRadius: "10px",
    background: "#a89fca"
  }
}

export default function Note() {

  return (
    <div className={styles.note_wrap} style={styles1.note_wrap}>
      <p>This is an example of a React component that contains some text.</p>
    </div>
  );
}

