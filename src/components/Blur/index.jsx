import { useContext } from 'react'
import styles from './styles'
import { TotalNotesContext } from '../Panel'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export default function Blur() {
    const { activateBlurScreen } = useContext(TotalNotesContext)
    let isDarkTheme = useThemeDetector()

    function toggleBlur() {
        activateBlurScreen(false)
    }
    return (
        <div onClick={toggleBlur} style={isDarkTheme ? styles.blur_wrap.dark : styles.blur_wrap.light}>

        </div>
    )
}
