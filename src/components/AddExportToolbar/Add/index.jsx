import styles from './styles'

export default function Add() {
    return (
        <div style={styles.btn_wrap}>
            <button style={styles.add_btn}>
                <span style={styles.icon}>
                    <svg style={styles.icon_svg} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="1">
                            <path d="M8.25 14.5L8.25 2" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                            <path d="M2 8.25H14.5" stroke="#33363F" strokeWidth="3" strokeLinecap="round" />
                        </g>
                    </svg>
                </span>
                <span style={styles.label}>Add a new note</span>
            </button>
        </div>
    )
}
