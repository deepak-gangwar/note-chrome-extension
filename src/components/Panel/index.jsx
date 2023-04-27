import styles from './styles'
import { useState, useEffect, useRef, createContext } from 'react'
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

    // Used for dragging the panel
    const panelRef = useRef()
    const titleBarRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [componentStyles, setComponentStyles] = useState(styles.panel)


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
