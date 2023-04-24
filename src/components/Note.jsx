export default function Note({ content }) {

  return (
    <div className={styles.note_wrap} style={styles.note_wrap}>
      <p>{content}</p>
    </div>
  );
}

const styles = {
  note_wrap: {
    boxSizing: "border-box",
    width: "calc(100% - 5rem)",
    fontSize: "0.9rem",
    margin: "5px auto",
    padding: "0.1rem 1rem",
    borderRadius: "10px",
    background: "#a89fca",
    color: "#232323",
  }
}