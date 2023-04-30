import styles from './styles'
import Controls from './Controls'
import { forwardRef } from 'react'


const TitleBar = forwardRef(function TitleBar({ title }, whatref) {
    return (
        <div className='titlebar' style={styles.titleBar} ref={whatref}>
            <Controls />

            <div className='titlebar_title' style={styles.title}>{title}</div>
        </div>
    )
})

export default TitleBar
