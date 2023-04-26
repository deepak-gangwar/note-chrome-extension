import styles from './styles'
import { useState, createContext } from 'react'
import { Store } from '../../store'
import TitleBar from '../TitleBar'
import Navbar from '../Navbar'
import Search from '../Search'
import Blur from '../Blur'
import Note from '../Note'
import AddExportToolbar from '../AddExportToolbar'

export const TotalNotesContext = createContext(Store)

export default function Panel() {
    const [listToRender, setListToRender] = useState(Store)
    const [currentList, setCurrentList] = useState(Store)
    const [isBlurScreenActive, setIsBlurScreenActive] = useState(false)

    // ADD NEW NOTE
    // ============

    function addNewNote(newNote) {
        const listOfNotes = currentList
        listOfNotes.push(newNote)
        setCurrentList(listOfNotes)
        setListToRender(listOfNotes)

        // !! To trigger re-render (does not serve any other purpose.) !!
        search("")
    }


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

    //IMP FUNCTION TO BLUR
    //====================
    function activateBlurScreen(showBlur) {
        setIsBlurScreenActive(showBlur)
    }
    return (
        <div className='panel' style={styles.panel}>
            <TotalNotesContext.Provider value={{ currentList, isBlurScreenActive, updateCurrentList, addNewNote, activateBlurScreen }}>
                <TitleBar title={":::"} />
                <Navbar />
                {isBlurScreenActive ? <Blur /> : ""}
                <Search handleTyping={search} />
                <ul className='chromenote-notes_list' style={styles.notes_list}>
                    {
                        listToRender.map((item) => (
                            <li key={item.id} >
                                <Note myItem={item} />
                            </li>
                        ))
                    }
                </ul>
                <AddExportToolbar />
            </TotalNotesContext.Provider>
        </div>
    )
}
