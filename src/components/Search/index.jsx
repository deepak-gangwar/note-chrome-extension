import { useState } from 'react'
import styles from './styles'

export default function Search({ handleTyping }) {
    const [text, setText] = useState("")
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
    return (
        <div className='chromenote-search' style={styles.search} >
            <input onKeyDown = {handleKeyPress} type="chromenote-text" className='bar' style={styles.bar} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} value={text} />
            <div className='chromenote-button' style={styles.button}>
                <svg className='chromenote-search_icon' style={styles.search_icon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" stroke="white" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}
