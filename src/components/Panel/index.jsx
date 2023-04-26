import styles from './styles'
import { useState, createContext } from 'react'
import { Store } from '../../store'
import TitleBar from '../TitleBar'
import Navbar from '../Navbar'
import Search from '../Search'
import Note from '../Note'
import AddExportToolbar from '../AddExportToolbar'

export const TotalNotesContext = createContext(Store)

export default function Panel() {
    const [listToRender, setListToRender] = useState(Store)
    const [currentList, setCurrentList] = useState(Store)


    // DELETE NOTE
    // ===========

    function updateCurrentList(content) {
        let noteToBeRemoved = undefined
        currentList.forEach(item => {
            if (item.note === content) {
                noteToBeRemoved = item
            }
        })
        const notesAfterRemoving = currentList.filter(element => element !== noteToBeRemoved)
        setCurrentList(notesAfterRemoving)
        setListToRender(notesAfterRemoving)
    }


    // FILTER NOTES
    // ============

    const search = (str) => {
        const query = str ? str : localStorage.getItem("chromenote-query")
        const filteredNotes = currentList.filter(element => element.note.includes(query))
        setListToRender(filteredNotes)
    }

    return (
        <div className='panel' style={styles.panel}>
            <TitleBar title={":::"} />
            <Navbar />
            <Search handleTyping={search} />
            <ul className='chromenote-notes_list' style={styles.notes_list}>
                {
                    listToRender.map((item) => (
                        <li key={item.id} >
                            <TotalNotesContext.Provider value={{ currentList, updateCurrentList }}>
                                <Note myItem={item} />
                            </TotalNotesContext.Provider>
                        </li>
                    ))}
            </ul>
            <AddExportToolbar />
        </div>
    )
}
