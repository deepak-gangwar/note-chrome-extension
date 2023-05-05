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

            <svg style={styles.keyboard_shortcut} width="129" height="41" viewBox="0 0 129 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.904 31V11.4H104.34V22.516L114.224 11.4H117.192L110.024 19.66L117.752 31H114.84L108.232 21.508L104.34 25.904V31H101.904Z" fill={isDarkTheme ? styles.keyboard_shortcut.color.dark : styles.keyboard_shortcut.color.light} />
                <rect x="88.5" y="0.5" width="40" height="40" rx="3.5" stroke={isDarkTheme ? styles.keyboard_shortcut.color.dark : styles.keyboard_shortcut.color.light} />
                <g fill={isDarkTheme ? styles.keyboard_shortcut.color.dark : styles.keyboard_shortcut.color.light}>
                    <path d="M24.3318 31.1679C18.7038 31.1679 15.1758 27.1919 15.1758 21.1999C15.1758 15.2639 18.8438 11.2319 24.5278 11.2319C28.8678 11.2319 32.0318 13.7519 32.7598 17.8119H30.1838C29.4278 15.0959 27.3558 13.4719 24.4158 13.4719C20.2998 13.4719 17.6678 16.6639 17.6678 21.1999C17.6678 25.7079 20.1878 28.9279 24.3038 28.9279C27.3278 28.9279 29.4278 27.3319 30.1558 24.5879H32.7318C32.0038 28.6479 28.7558 31.1679 24.3318 31.1679Z" />
                    <path d="M37.0394 27.2759V18.8199H34.4634V16.7199H37.0394V12.7159H39.3354V16.7199H43.0314V18.8199H39.3354V27.2479C39.3354 28.4519 39.7554 28.8999 40.9874 28.8999H43.2554V30.9999H40.7634C38.0194 30.9999 37.0394 29.7959 37.0394 27.2759Z" />
                    <path d="M52.2449 16.7199H52.8889V18.9599H51.7409C48.7449 18.9599 47.9329 21.4519 47.9329 23.7199V30.9999H45.6369V16.7199H47.6249L47.9329 18.8759C48.6049 17.7839 49.6969 16.7199 52.2449 16.7199Z" />
                    <path d="M55.2711 30.9999V11.3999H57.5671V30.9999H55.2711Z" />
                </g>
                <rect x="0.5" y="0.5" width="76" height="40" rx="3.5" stroke={isDarkTheme ? styles.keyboard_shortcut.color.dark : styles.keyboard_shortcut.color.light} />
            </svg>



            <div className='chromenote-button' style={buttonStyles}>
                <svg className='chromenote-search_icon' style={iconStyles} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}
