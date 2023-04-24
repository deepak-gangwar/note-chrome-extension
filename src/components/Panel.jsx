import styles from '../styles/Panel.module.css'
import Search from './Search'
import Note from './Note.jsx'
import { useState } from 'react'

const totalNotes = [
  {
    id: 1,
    note: "abc"
  },
  {
    id: 2,
    note: "there is nothing left"
  },
  {
    id: 3,
    note: "deepak is fuckboy"
  },
  {
    id: 5,
    note: "kanhaiya is popular in girls"
  },
  {
    id: 4,
    note: "aniket is playboy"
  }
]

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
    <div className={styles.panel}>
      <h1>Saved Notes</h1>
      <Search onTyping={() => search()} />

      <ul>
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