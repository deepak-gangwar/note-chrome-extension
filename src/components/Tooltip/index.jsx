import styles from './styles'
import { useEffect, useState } from 'react'
import { useSelection } from '../../hooks/useSelection'
import Popper from './Popper'

export default function Tooltip({ sendNoteToApp }) {
    const selectedText = useSelection();
    const [currentStr, setCurrentStr] = useState("")
    const [previousSelectedStr, setPreviousSelectedStr] = useState("")
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    // used for tooltip placement
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


    function closeTooltip() {
        setIsTooltipVisible(false)
    }
    // CONDITIONALLY RENDERING THE TOOLTIP
    // ===================================
    function handleTooltipVisiblity() {

        if (selectedText && selectedText.text && selectedText.text.length && selectedText.text.length > 1) {
            setCurrentStr(selectedText.text)
            setPreviousSelectedStr(selectedText.text)
            setIsTooltipVisible(true)
        } else {
            // console.log("text is not selected")
            // setIsTooltipVisible(false)
        }
    }

    // POSITIONING OF TOOLTIP
    // ======================

    function handleYPosition(e) {
        setTopOffset(e.clientY)
    }

    // 👇 THIS IS RUNNING DURING THE TIME WHEN SELECTION IS CHANGING

    useEffect(() => {

        window.addEventListener('mousedown', (e) => handleYPosition(e))
        window.addEventListener('mouseup', handleTooltipVisiblity)
        return () => {
            window.removeEventListener('mouseup', handleTooltipVisiblity)
            window.removeEventListener('mousedown', (e) => handleYPosition(e))
        }
    }, [selectedText])

    // ADD SELECTION TO NOTES STORE
    // ===========================

    function addNoteToStore() {
        if (previousSelectedStr.length > 1) sendNoteToApp(previousSelectedStr)
        setIsTooltipVisible(false)
        setCurrentStr("")
        setPreviousSelectedStr("")
    }


    return (
        <>
            {/* ================ Tooltip ================ */}
            {isTooltipVisible ? (
                <div style={{ ...styles.tooltip_container, top: posY, left: posX }}>
                    <Popper addNote={addNoteToStore} closeTooltip={closeTooltip} />
                </div>
            ) : ''}
        </>
    )
}
