// import styles from '../styles/Search.module.css'

const styles = {
    search: {
        padding: "4.5rem 2.5rem",
        display: "flex",
        justifyContent: "center"
    },

    bar: {
        outline: "none",
        border: "0",
        display: "inline",
        width: "100%",
        height: "2.4rem",
        padding: "0 2rem",
        fontSize: "0.8rem",
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
    },

    button: {
        cursor: "pointer",
        height: "2.4rem",
        display: "inline-block",
        width: "16%",
        backgroundColor: "#232323",
        color: "#f5f5f5",
        textAlign: "center",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
    },

    search_icon: {
        transform: "translateY(-2px) scale(0.4)"
    }
}


export default function Search({ onTyping }) {
    function handleChange(query) {
        window.localStorage.setItem("query", query)
        onTyping()
    }

    return (
        <div className={styles.search} style={styles.search} >
            <input type="text" className={styles.bar} style={styles.bar} name='search-bar' placeholder="Search for notes..." onChange={(e) => handleChange(e.target.value)} />
            <div className={styles.button} style={styles.button}>
                <svg className={styles.search_icon} style={styles.search_icon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19.25" cy="19.25" r="12.25" stroke="white" strokeWidth="4" />
                    <path d="M35 35L29.75 29.75" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    )
}