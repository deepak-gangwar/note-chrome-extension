import styles from './styles'
import Controls from './Controls'
import { forwardRef } from 'react'
import { useThemeDetector } from '../../hooks/useThemeDetector'


const TitleBar = forwardRef(function TitleBar({ title }, whatref) {
    let isDarkTheme = useThemeDetector()

    return (
        <div className='titlebar' style={isDarkTheme ? styles.titleBar.dark : styles.titleBar.light} ref={whatref}>
            <Controls />

            <div className='titlebar_title' style={isDarkTheme ? styles.title.dark : styles.title.light}>{title}</div>
        </div>
    )
})

export default TitleBar
