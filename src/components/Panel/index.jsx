import styles from './styles'
import { useState, useEffect, useRef, createContext, forwardRef, useImperativeHandle } from 'react'
import { Store } from '../../store'
import TitleBar from '../TitleBar'
import Navbar from '../Navbar'
import Search from '../Search'
import Blur from '../Blur'
import Note from '../Note'
import AddExportToolbar from '../AddExportToolbar'
import { Reorder, useDragControls } from 'framer-motion'
import { ReorderIcon } from './DragIcon/icon'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export const TotalNotesContext = createContext(Store)

if (window.localStorage.getItem("chromenote-Store") === null) {
    window.localStorage.setItem("chromenote-Store", JSON.stringify(Store))
}

const Panel = forwardRef(function Panel(props, ref) {
    let isDarkTheme = useThemeDetector()

    // Saving All Notes as a Local Storage
    let chromenoteStore = window.localStorage.getItem("chromenote-Store")
    let StoredNotes = JSON.parse(chromenoteStore)

    // List to Render on Panel
    const [listToRender, setListToRender] = useState(StoredNotes)

    // Current List of Notes to show on Panel
    // const [currentList, setCurrentList] = useState(StoredNotes)

    // To toggle blur screen if note is clicked or else.
    const [isBlurScreenActive, setIsBlurScreenActive] = useState(false)

    // get info for opened note in panel

    // to turn off other notes
    // const [whichNoteIsActive, setWhichNoteIsActive] = useState(Array(StoredNotes.length).fill(false))
    // now the state whichNoteIsActive is equal to an array with nine elements and sets them to null

    const map = new Map()
    StoredNotes.forEach(item => {
        map.set(item.id, false)
    })

    const [whichNoteIsActive, setWhichNoteIsActive] = useState(map)


    // Used for dragging the panel
    const panelRef = useRef()
    const titleBarRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [componentStyles, setComponentStyles] = useState(isDarkTheme ? { ...styles.panel.dark } : { ...styles.panel.light })


    // ADD SELECTION AS NOTE, COMING FROM TOOLTIP -> APP -> PANEL
    useImperativeHandle(ref, () => ({
        addSelectionFromTooltip(val) {
            const newId = Math.random().toString(36).slice(2)
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

                setComponentStyles(isDarkTheme ? { ...styles.panel.dark, transform: `translate(${newPosition.x}px, ${newPosition.y}px)` } : { ...styles.panel.light, transform: `translate(${newPosition.x}px, ${newPosition.y}px)` })
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

    // Update component styles whenever isDarkTheme changes, includes change in themes in between usage.
    useEffect(() => {
        setComponentStyles(isDarkTheme ? { ...styles.panel.dark } : { ...styles.panel.light })
    }, [isDarkTheme])


    // ADD NEW NOTE
    // ============

    function addNewNote(newNote) {
        const listOfNotes = StoredNotes
        listOfNotes.push(newNote)
        // setCurrentList(listOfNotes)
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
        StoredNotes.forEach(item => {
            if (item.note === content) {
                noteToBeRemoved = item
            }
        })
        const notesAfterRemoving = StoredNotes.filter(element => element !== noteToBeRemoved)
        // setCurrentList(notesAfterRemoving)
        setListToRender(notesAfterRemoving)

        // adding added note in local storage
        window.localStorage.setItem("chromenote-Store", JSON.stringify(notesAfterRemoving))

    }


    // FILTER NOTES
    // ============

    const search = (str) => {
        const query = str ? str : localStorage.getItem("chromenote-query")
        const filteredNotes = StoredNotes.filter(element => element.note.includes(query))
        setListToRender(filteredNotes)
    }

    //IMP FUNCTION TO BLUR
    //====================

    function activateBlurScreen(showBlur) {
        setIsBlurScreenActive(showBlur)
    }


    // MANAGES STATE IN PARENT OF WHICH NOTES ARE ACTIVE
    // =================================================


    // optimization can be done here using a variable that will improve the speed of closing editor
    // instead of settin every value as false we can set past value of openedEditor as false
    function openNoteHandler(id) {
        const activeArrCopy = new Map(whichNoteIsActive)
        const tmp = activeArrCopy.get(id)
        activeArrCopy.forEach((value, id) => {
            activeArrCopy.set(id, false)
        })
        activeArrCopy.set(id, !tmp)
        setWhichNoteIsActive(activeArrCopy)
    }

    // Ro use in reorder item with framer motion
    const dragControls = useDragControls()

    return (
        <div className='chromenote-panel' style={componentStyles} ref={panelRef}>
            <TotalNotesContext.Provider value={{ StoredNotes, isBlurScreenActive, updateCurrentList, addNewNote, activateBlurScreen }}>
                <TitleBar title={":::"} ref={titleBarRef} />
                <Navbar />
                {isBlurScreenActive ? <Blur /> : ""}
                <Search handleTyping={search} />

                {/* ======================= Currently dragging with both controls and item ======================= */}

                <Reorder.Group axis="y" values={listToRender} onReorder={setListToRender} className='chromenote-notes_list' style={styles.notes_list}>
                    {listToRender.map((item) => (
                        <Reorder.Item key={item.id} value={item} style={styles.notes_list_item} >
                            {/* <Reorder.Item key={item.id} value={item} dragListener={false} dragControls={dragControls} > */}
                            <Note myItem={item} changeStatesInParent={openNoteHandler} activeValue={whichNoteIsActive.get(item.id)} />
                            <ReorderIcon dragControls={dragControls} />
                        </Reorder.Item>

                    ))}
                </Reorder.Group>

                {/* ======================= Original list rendering without framer-motion ======================= */}

                {/* <ul className='chromenote-notes_list' style={styles.notes_list}>
                    {
                        listToRender.map((item) => (
                            <li key={item.id} >
                                <Note myItem={item} changeStatesInParent={openNoteHandler} activeValue={whichNoteIsActive.get(item.id)} />
                            </li>
                        ))
                    }
                </ul> */}
                <AddExportToolbar />
            </TotalNotesContext.Provider>
        </div>
    )
})

export default Panel
