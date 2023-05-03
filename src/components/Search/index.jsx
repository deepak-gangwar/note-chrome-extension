import styles from './styles'
import { useState, useEffect } from 'react'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export default function Search({ handleTyping }) {
    const isDarkTheme = useThemeDetector()
    const [text, setText] = useState("")
    const [searchBarStyles, setSearchBarStyles] = useState(isDarkTheme ? { ...styles.bar.dark } : { ...styles.bar.light })
    const [buttonStyles, setButtonStyles] = useState(isDarkTheme ? { ...styles.button.dark } : { ...styles.button.light })
    const [iconStyles, setIconStyles] = useState(isDarkTheme ? { ...styles.search_icon, stroke: "#eef35f" } : { ...styles.search_icon, stroke: "white" })

    function handleChange(query) {
        setText(query)
        window.localStorage.setItem("chromenote-query", query)
        handleTyping()
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            handleChange("")
            setText("")
        }
    }

    // Update component styles whenever isDarkTheme changes, includes change in themes in between usage.
    useEffect(() => {
        setSearchBarStyles(isDarkTheme ? { ...styles.bar.dark } : { ...styles.bar.light })
        setButtonStyles(isDarkTheme ? { ...styles.button.dark } : { ...styles.button.light })
        setIconStyles(isDarkTheme ? { ...styles.search_icon, stroke: "#eef35f" } : { ...styles.search_icon, stroke: "white" })
    }, [isDarkTheme])

    return (
        <div className='chromenote-search' style={styles.search} >
            <input onKeyDown={handleKeyPress} type="chromenote-text" className='bar' style={searchBarStyles} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} value={text} />
            <div className='chromenote-button' style={buttonStyles}>
                <svg className='chromenote-search_icon' style={iconStyles} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}
