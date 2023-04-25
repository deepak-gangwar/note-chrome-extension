import styles from './styles'
import Search from '../Search'
import Note from '../Note'
import { useState, createContext, createFactory } from 'react'
import { Store } from '../../store'
import { useEffect } from 'react'

// console.log(Store)

export const TotalNotesContext = createContext(Store);

export default function Panel() {
    const [currentList, setCurrentList] = useState(Store)

    const search = () => {
        const query = localStorage.getItem("query")
        const searchedNotes = Store.filter(element => {
            return element.note.includes(query)
        })

        setCurrentList(searchedNotes)
    }

    function handleNoteClick() {
        const listItems = currentList
        setCurrentList(listItems)
        console.log(listItems)
        search()        
    }

    // useEffect(() => {
        // console.log(currentList)
    // }, [handleNoteClick])

    return (
        <div className='panel' style={styles.panel}>
            <Search onTyping={() => search()} />

            <ul className='chromenote-notes_list' style={styles.notes_list}>
                {currentList.map((item) => (
                    <li key={item.id} >
                        <TotalNotesContext.Provider value = {{currentList, setCurrentList}}>
                            <Note content = {item.note} noteClickHandler={handleNoteClick}/>
                        </TotalNotesContext.Provider>
                    </li>
                ))}
            </ul>
        </div>
    )
}
