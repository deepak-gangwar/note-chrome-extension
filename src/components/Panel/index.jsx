import styles from './styles'
import Search from '../Search'
import Note from '../Note'
import { useState } from 'react'
import { totalNotes } from '../../store'

export default function Panel() {
    const [currentNotes, setCurrentNotes] = useState(totalNotes)

    const search = () => {
        const query = localStorage.getItem("query")
        const searchedNotes = totalNotes.filter(element => {
            return element.note.includes(query)
        })

        setCurrentNotes(searchedNotes)
    }

    return (
        <div className='panel' style={styles.panel}>
            <Search onTyping={() => search()} />

            <ul className='chromenote-notes_list' style={styles.notes_list}>
                {currentNotes.map((item) => (
                    <li key={item.id}>
                        <Note content={item.note} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
