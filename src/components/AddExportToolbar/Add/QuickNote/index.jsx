import styles from './styles'
import Controls from './Controls'

export default function QuickNote() {
    return (
        <div style={styles.quicknote_wrap}>
            <textarea style={styles.textarea} type="text" />
            <Controls />
        </div>
    )
}
