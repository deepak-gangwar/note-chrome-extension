import styles from '../styles/Search.module.css'


export default function Search({ onTyping }) {
    function handleChange(query) {
        window.localStorage.setItem("query", query)
        onTyping()
    }

    return (
        <div className={styles.search}>
            <input type="text" className={styles.bar} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} />
            <div className={styles.button}>
                <svg className={styles.search_icon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" stroke="white" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}