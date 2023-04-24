// import styles from '../styles/Panel.module.css'
import Search from './Search'
import Note from './Note.jsx'
import { useState } from 'react'
import { totalNotes } from '../store'

const styles = {
  panel: {
    width: "410px",
    height: "550px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    boxShadow: "3px 3px 14px rgba(1, 1, 1, 0.2)",
    zIndex: "10000"
  },

  notes_list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  }
}


export default function Panel() {
  const [currentNotes, setCurrentNotes] = useState(totalNotes);

  const search = () => {
    const query = localStorage.getItem("query")

    // const response = await fetch(
    //   'http://localhost:8080?' + new URLSearchParams({ q })
    // );
    // const currentNotes = await response.json();

    const searchedNotes = totalNotes.filter(element => {
      return element.note.includes(query)
    })

    setCurrentNotes(searchedNotes)
  }

  return (
    <div className='panel' style={styles.panel}>
      <Search onTyping={() => search()} />

      <ul style={styles.notes_list}>
        {currentNotes.map((item) => (
          <li key={item.id}>
            <strong>{item.note}</strong>
          </li>
        ))}

        <Note />
      </ul>
    </div>
  )
}