import styles from './styles'
import Controls from './Controls'

export default function TitleBar({ title }) {
    return (
        <>
            <div className='titlebar' style={styles.titleBar}>
                <Controls />

                <div className='titlebar_title' style={styles.title}>{title}</div>
            </div>
        </>
    )
}
