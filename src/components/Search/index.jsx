import styles from './styles'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export default function Search({ handleTyping }) {
    const isDarkTheme = useThemeDetector()
    const inputRef = useRef(null)
    const [text, setText] = useState("")
    const [searchBarStyles, setSearchBarStyles] = useState(isDarkTheme ? { ...styles.bar.dark } : { ...styles.bar.light })
    const [buttonStyles, setButtonStyles] = useState(isDarkTheme ? { ...styles.button.dark } : { ...styles.button.light })
    const [iconStyles, setIconStyles] = useState(isDarkTheme ? { ...styles.search_icon, stroke: "#eef35f" } : { ...styles.search_icon, stroke: "white" })


    //  KEY PRESS HANDLER FOR KEYBOARD SHORTCUTS
    // =========================================

    // It's wrapped in a callback because we'll be using it in a useEffect, and
    // don't want it to trigger the useEffect on every render of the component.
    const handleKeyPress = useCallback((event) => {

        // Ctrl + K to open search
        // check if the Ctrl key is pressed
        if (event.ctrlKey === true) {
            if (event.key === "k") {
                // prevent focusing on address bar
                event.preventDefault()
                // focus on search input instead
                inputRef.current.focus()
            }
        }

        // Esc to remove focus from search
        if (event.key === "Escape") {
            inputRef.current.blur()
        }
    }, [])

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    // UPDATE SEARCH QUERY WHEN USER TYPES TO FILTER NOTES
    // ===================================================

    function handleChange(query) {
        setText(query)
        window.localStorage.setItem("chromenote-query", query)
        handleTyping()
    }


    // DARK THEME UPDATE FOR STYLES
    // ============================

    useEffect(() => {
        setSearchBarStyles(isDarkTheme ? { ...styles.bar.dark } : { ...styles.bar.light })
        setButtonStyles(isDarkTheme ? { ...styles.button.dark } : { ...styles.button.light })
        setIconStyles(isDarkTheme ? { ...styles.search_icon, stroke: "#eef35f" } : { ...styles.search_icon, stroke: "white" })
    }, [isDarkTheme])

    return (
        <div className='chromenote-search' style={styles.search} >
            {/* <input onKeyUp={handleKeyPress} type="chromenote-text" className='bar' style={searchBarStyles} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} value={text} /> */}
            <input ref={inputRef} type="chromenote-text" className='bar' style={searchBarStyles} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} value={text} />
            <div className='chromenote-button' style={buttonStyles}>
                <svg className='chromenote-search_icon' style={iconStyles} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}
