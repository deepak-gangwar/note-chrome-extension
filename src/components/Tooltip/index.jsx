import styles from './styles'
import { useEffect, useState } from 'react'
import Popper from './Popper'

export default function Tooltip() {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

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

    const selectedText = useSelection();
    const [topOffset, setTopOffset] = useState('0')
    const [posY, setPosY] = useState('0')
    const [posX, setPosX] = useState('0')

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

    // whenever selection changes calculate new top & left offsets
    // useEffect(() => {
    //     const position = document.documentElement.scrollTop || document.body.scrollTop;
    //     const body = document.querySelector('body');

    //     if (selectedText && selectedText.text.length) {
    //         // store the currently selected range
    //         // let range = selectedText.Textselection.getRangeAt(0);
    //         let range = window.getSelection.getRangeAt(0);
    //         console.log(range)
    //         // store the size of the range and its position relative to the viewport
    //         // let rect = range.getBoundingClientRect();
    //         // console.log(rect)
    //         //     // there's some stylistic hard-coding bellow, it's to place the tooltip slightly off center
    //         //     setLocation({
    //         //         top: position + rect.top - TOOLTIP_HEIGHT * FACTOR,
    //         //         left: rect.left + rect.width / 2 - body.getBoundingClientRect().width / 15,
    //         //     })
    //     }

    // }, [selectedText])


    // CONDITIONALLY RENDERING THE TOOLTIP

    useEffect(() => {
        function handleVisiblity() {
            if (selectedText && selectedText.text && selectedText.text.length && selectedText.text.length > 1) {
                setIsTooltipVisible(true)
            } else {
                setIsTooltipVisible(false)
            }
        }

        function handleYPosition(e) {
            setTopOffset(e.clientY)
        }

        window.addEventListener('mousedown', (e) => handleYPosition(e))
        window.addEventListener('mouseup', handleVisiblity)
        return () => {
            window.removeEventListener('mouseup', handleVisiblity)
        }
    }, [selectedText])

    return (
        <>
            <button style={styles.tooltip}>Add note</button>

            {/* ================ Tooltip ================ */}

            {isTooltipVisible ? (
                <div style={{ ...styles.tooltip_container, top: posY, left: posX }}>
                    <Popper />
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
