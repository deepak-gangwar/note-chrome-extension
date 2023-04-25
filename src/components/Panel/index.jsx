import styles from './styles'
import Search from '../Search'
import Note from '../Note'
import { useState, createContext, createFactory } from 'react'
import { Store } from '../../store'
import { useEffect } from 'react'
import TitleBar from '../TitleBar'


export const TotalNotesContext = createContext(Store);

export default function Panel() {
    const [arr, setArr] = useState(Store)
    const [currentList, setCurrentList] = useState(Store)

    // function updateCurrentList(listItems){
        // console.log("this is ultimate goal")
        // setCurrentList(listItems)
        // allNotes = listItems
    // }

    // DELETE NOTE
    function dummy(str) {
        let noteToBeRemoved = undefined
        currentList.forEach(item => {
            if(item.note === str) {
                noteToBeRemoved = item
            }
        })

        const notesAfterRemoving = currentList.filter(element => element !== noteToBeRemoved)
        setCurrentList(notesAfterRemoving)
        setArr(currentList)
    }

    // useEffect(() => search(), [])


    // FILTER NOTES
    // ===========

    const search = () => {
        const query = localStorage.getItem("query")
        const filteredNotes = currentList.filter(element => element.note.includes(query))
        setArr(filteredNotes)
        console.log(arr)
    }

    return (
        <div className='panel' style={styles.panel}>
            <TitleBar title={"App"} />
            <Search onTyping={search} />

            <ul className='chromenote-notes_list' style={styles.notes_list}>
                {
                    arr.map((item) => (
                        <li key={item.id} >
                            <Note content={item.note} handler={dummy} />
                        </li>
                ))}

            </ul>
        </div>
    )
}



// {currentList.map((item) => (
//     <li key={item.id} >
//         <Note content={item.note} handler={dummy} />
//     </li>
// ))}

// {currentList.map((item) => (
//     <li key={item.id} >
//         <TotalNotesContext.Provider value = {{currentList, updateCurrentList}}>
//             <Note content = {item.note} />
//         </TotalNotesContext.Provider>
//     </li>
// ))}
