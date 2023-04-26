import styles from './styles'
import Add from './Add'
import Export from './Export'

export default function AddExportToolbar() {
    return (
        <div style={styles.toolbar_wrap}>
            <Add />
            <Export />
        </div>
    )
}
