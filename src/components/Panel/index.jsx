import styles from './styles'
import { useState, useEffect, useRef, createContext, forwardRef, useImperativeHandle } from 'react'
import { Store } from '../../store'
import TitleBar from '../TitleBar'
import Navbar from '../Navbar'
import Search from '../Search'
import Blur from '../Blur'
import Note from '../Note'
import AddExportToolbar from '../AddExportToolbar'

export const TotalNotesContext = createContext(Store)

if(window.localStorage.getItem("chromenote-Store") === null) {
    window.localStorage.setItem("chromenote-Store", JSON.stringify(Store))
}
let currentOpenedNote = 0;

const Panel = forwardRef(function Panel(props, ref) {


    // Saving All Notes as a Local Storage
    let chromenoteStore = window.localStorage.getItem("chromenote-Store")
    let StoredNotes = JSON.parse(chromenoteStore)

    // List to Render on Panel
    const [listToRender, setListToRender] = useState(StoredNotes)

    // Current List of Notes to show on Panel
    const [currentList, setCurrentList] = useState(StoredNotes)

    // To toggle blur screen if note is clicked or else.
    const [isBlurScreenActive, setIsBlurScreenActive] = useState(false)

    // get info for opened note in panel
    // let [currentOpenedNote, setCurrentOpenedNote] = useState(0)

    // to turn off other notes
    const [whichNoteIsActive, setWhichNoteIsActive] = useState(Array(currentList.length).fill(false))
    // now the state whichNoteIsActive is equal to an array with nine elements and sets them to null


    // Used for dragging the panel
    const panelRef = useRef()
    const titleBarRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [componentStyles, setComponentStyles] = useState(styles.panel)


    // ADD SELECTION AS NOTE, COMING FROM TOOLTIP -> APP -> PANEL
    useImperativeHandle(ref, () => ({
        addSelectionFromTooltip(val) {
            const numItems = currentList.length
            const newId = currentList[numItems - 1].id + 1
            const newNote = {
                id: newId,
                note: val
            }
            addNewNote(newNote)
        },
    }))


    // FEATURE: DRAG PANEL ACROSS THE SCREEN
    // =====================================

    useEffect(() => {
        const titleBar = titleBarRef.current

        const handleMouseDown = (event) => {
            if (event.button === 0) { // check if left mouse button is pressed
                setIsDragging(true)
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        const handleMouseMove = (event) => {
            if (isDragging) {
                // const bounds = panelRef.current.getBoundingClientRect()
                const newPosition = {
                    // Change the multiplied factor to vary the speed and amount
                    x: position.x + event.movementX * 1,
                    y: position.y + event.movementY * 1,
                };

                // Check if the panel is within the bounds of the window
                setPosition(newPosition)

                setComponentStyles({ ...styles.panel, transform: `translate(${newPosition.x}px, ${newPosition.y}px)` })
            }
        }

        const haltMovement = () => {
            handleMouseUp()
        }

        // We are listening to mouse events rather than drag events
        titleBar.addEventListener('mousedown', handleMouseDown)
        titleBar.addEventListener('mouseup', handleMouseUp)
        titleBar.addEventListener('mousemove', handleMouseMove)
        titleBar.addEventListener('mouseleave', haltMovement)

        // Clean up the event listeners when the component unmounts
        return () => {
            titleBar.removeEventListener('mousedown', handleMouseDown)
            titleBar.removeEventListener('mouseup', handleMouseUp)
            titleBar.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isDragging, position])


    // ADD NEW NOTE
    // ============

    function addNewNote(newNote) {
        console.log(newNote)
        const listOfNotes = StoredNotes
        listOfNotes.push(newNote)
        setCurrentList(listOfNotes)
        setListToRender(listOfNotes)

        // adding added note in local storage
        window.localStorage.setItem("chromenote-Store", JSON.stringify(listOfNotes))
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

        // adding added note in local storage
        window.localStorage.setItem("chromenote-Store", JSON.stringify(notesAfterRemoving))

    }


    // FILTER NOTES
    // ============

    const search = (str) => {
        console.log(currentOpenedNote)
        const query = str ? str : localStorage.getItem("chromenote-query")
        const filteredNotes = currentList.filter(element => element.note.includes(query))
        setListToRender(filteredNotes)
    }

    //IMP FUNCTION TO BLUR
    //====================

    function activateBlurScreen(showBlur) {
        setIsBlurScreenActive(showBlur)
    }


    // MANAGES STATE IN PARENT OF WHICH NOTES ARE ACTIVE
    // =================================================

    function openNoteHandler(i) {
        const nextSquares = whichNoteIsActive.slice()
        const tmp = nextSquares[i]
        nextSquares.fill(false)
        nextSquares[i] = !tmp
        setWhichNoteIsActive(nextSquares)
    }


    return (
        <div className='panel' style={componentStyles} ref={panelRef}>
            <TotalNotesContext.Provider value={{ currentList, isBlurScreenActive, updateCurrentList, addNewNote, activateBlurScreen }}>
                <TitleBar title={":::"} ref={titleBarRef} />
                <Navbar />
                {isBlurScreenActive ? <Blur /> : ""}
                <Search handleTyping={search} />
                <ul className='chromenote-notes_list' style={styles.notes_list}>
                    {
                        listToRender.map((item) => (
                            <li key={item.id} >
                                <Note myItem={item} changeStatesInParent={openNoteHandler} activeValue={whichNoteIsActive[item.id]} />
                            </li>
                        ))
                    }
                </ul>
                <AddExportToolbar />
            </TotalNotesContext.Provider>
        </div>
    )
})

export default Panel
