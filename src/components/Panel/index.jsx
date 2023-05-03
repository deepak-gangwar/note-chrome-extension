import styles from './styles'
import { useState, useEffect, useRef, createContext, forwardRef, useImperativeHandle } from 'react'
import { Store } from '../../store'
import TitleBar from '../TitleBar'
import Navbar from '../Navbar'
import Search from '../Search'
import Blur from '../Blur'
import Note from '../Note'
import AddExportToolbar from '../AddExportToolbar'
import { motion, Reorder, useDragControls } from 'framer-motion'
import { ReorderIcon } from './DragIcon/icon'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export const TotalNotesContext = createContext(Store)

if (window.localStorage.getItem("chromenote-Store") === null) {
    window.localStorage.setItem("chromenote-Store", JSON.stringify(Store))
}

const Panel = forwardRef(function Panel(props, ref) {
    let isDarkTheme = useThemeDetector()
    const dragBoundaryRef = useRef()
    const titleBarRef = useRef()
    const [componentStyles, setComponentStyles] = useState(isDarkTheme ? { ...styles.panel.dark } : { ...styles.panel.light })

    // Saving All Notes as a Local Storage
    let chromenoteStore = window.localStorage.getItem("chromenote-Store")
    let StoredNotes = JSON.parse(chromenoteStore)

    // List to Render on Panel
    const [listToRender, setListToRender] = useState(StoredNotes)

    // To toggle blur screen if note is clicked or else.
    const [isBlurScreenActive, setIsBlurScreenActive] = useState(false)

    // to turn off other notes
    // const [whichNoteIsActive, setWhichNoteIsActive] = useState(Array(StoredNotes.length).fill(false))
    // now the state whichNoteIsActive is equal to an array with nine elements and sets them to null
    const map = new Map()
    StoredNotes.forEach(item => {
        map.set(item.id, false)
    })
    const [whichNoteIsActive, setWhichNoteIsActive] = useState(map)


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


    // HANDLE DARK THEME
    // =================
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

    // To use in reorder item with framer motion
    const dragControls = useDragControls()


    function handleKeyPress(event) {
        /// connect it with addexportToolbar
        if (event.key === "/") {
            event.preventDefault()
            console.log("open new note box")
        }
    }
    return (
        <>
            {/* ============= Boundary to limit drag of panel ============== */}
            <div ref={dragBoundaryRef} className='chromenote-drag-boundary' style={{ position: "absolute", inset: 0, zIndex: "-1" }}></div>

            {/* ===================== Panel Component ===================== */}
            <motion.div
                className='chromenote-panel'
                style={componentStyles}
                tabIndex="0"
                onKeyUp={handleKeyPress}

                // framer motion things to make it draggable
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={dragBoundaryRef}
            >
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
            </motion.div>
        </>
    )
})

export default Panel
