import styles from './styles'
import { useEffect, useState } from 'react'
import Popper from './Popper'

export default function Tooltip({ sendNoteToApp }) {
    const selectedText = useSelection();
    const [currentStr, setCurrentStr] = useState("")
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const [topOffset, setTopOffset] = useState('0')
    const [posY, setPosY] = useState('0')
    const [posX, setPosX] = useState('0')

    const [isClickedOnPopper, setIsClickedOnPopper] = useState(false)
    // ALTERNATIVE WORKING SOLUTION FOR TEXT SELECTION
    // ===============================================

    // useEffect(() => {
    //     function getSelectedText() {
    //         let selectedText = ''
    //         if (window.getSelection()) {
    //             selectedText = window.getSelection().toString().trim()
    //         } else if (document.getSelection()) {
    //             selectedText = document.getSelection().toString().trim()
    //         } else if (document.selection) {
    //             selectedText = document.selection.createRange().text.toString().trim()
    //         }

    //         // Make changes here, return only when not an empty string
    //         if (selectedText !== '') {
    //             console.log(selectedText)
    //         }
    //         return selectedText;
    //     }

    //     window.addEventListener('mouseup', getSelectedText)
    //     return () => {
        //         window.removeEventListener('mouseup', getSelectedText)
        //     }
        // }, [])


        // work only when clicking on add to note
        function addToNote() {

        }

    useEffect(() => {
        function launchTooltip(event) {
            // Find out how much (if any) user has scrolled
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            // setPosY(event.clientY + scrollTop - 60)
            setPosY(topOffset + scrollTop - 60)
            setPosX(event.clientX)
        }

        window.addEventListener('mouseup', (event) => launchTooltip(event))
        return () => {
            window.removeEventListener('mouseup', (event) => launchTooltip(event))
        }
    }, [selectedText, topOffset])

    // CONDITIONALLY RENDERING THE TOOLTIP
    // ===================================
    function handleVisiblity() {
        console.log("handle this visibility")
        console.log("selected text  ->  " + selectedText.text)
        console.log("currentStr text  ->  " + currentStr)


        if (selectedText && selectedText.text && selectedText.text.length && selectedText.text.length > 1) {
            // selectedText.text === currentStr ? setIsTooltipVisible(false) : setIsTooltipVisible(true)
            setCurrentStr(selectedText.text)
            setIsTooltipVisible(true)
        } else {
            console.log("text is not selected")
        }

        // if(currentStr.length == 0) setIsTooltipVisible(false)
    }


    // POSITIONING OF TOOLTIP
    // ======================

    function handleYPosition(e) {
        setTopOffset(e.clientY)
    }

    useEffect(() => {

        window.addEventListener('mousedown', (e) => handleYPosition(e))
        window.addEventListener('mouseup', handleVisiblity)
        return () => {
            window.removeEventListener('mouseup', handleVisiblity)
            window.removeEventListener('mousedown', (e) => handleYPosition(e))
        }
    }, [selectedText])

    // ADD SELECTION TO NOTES STORE
    // ===========================

    function addNoteToStore() {
        console.log("add this note in list")
        // console.log(currentStr)
        if(currentStr.length > 1) sendNoteToApp(currentStr)
        setIsTooltipVisible(false)
        setCurrentStr("")
    }


    return (
        <>
            {/* ================ Tooltip ================ */}
            {isTooltipVisible ? (
                <div style={{ ...styles.tooltip_container, top: posY, left: posX }}>
                    <Popper addNote={addNoteToStore} />
                </div>
            ) : ''}
        </>
    )
}


// DEFINING OUR OWN CUSTOM HOOK TO GET SELECTED TEXT
// =================================================

const useSelection = () => {
    const [selectedText, setSelectedText] = useState()

    // callback function that updates state with current selection
    const handleSelectionChange = () => {
        let selection
        let text = ''

        // if browser supports selection API
        if (window.getSelection()) {
            selection = window.getSelection()
            text = selection.toString().trim()
        } else if (document.getSelection()) {
            selection = document.getSelection()
            text = selection.toString().trim()
        } else if (document.selection) {
            selection = document.selection.createRange().text
            text = selection.toString().trim()
        }

        // update state with selected text and Selection object
        setSelectedText({ text, selection })
    }

    useEffect(() => {
        let isSubscribed = true
        // whenever selection on page changes, call handleSelectionChange callback
        document.onselectionchange = () => isSubscribed && handleSelectionChange()

        // 'unsubscribe' from event listener on component dismount
        return () => isSubscribed = false
    }, [])

    return selectedText
}
