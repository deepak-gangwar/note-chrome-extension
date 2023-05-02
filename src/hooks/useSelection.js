import { useState, useEffect } from "react"

// DEFINING OUR OWN CUSTOM HOOK TO GET SELECTED TEXT
// =================================================

export const useSelection = () => {
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
