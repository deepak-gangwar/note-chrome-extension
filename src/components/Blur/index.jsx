import { useContext } from 'react'
import styles from './styles'
import { TotalNotesContext } from '../Panel'

export default function Blur() {
    const {activateBlurScreen} = useContext(TotalNotesContext)

    function toggleBlur() {
        activateBlurScreen(false)
    }
    return (
        <div onClick ={toggleBlur} style={styles.blur_wrap}>

        </div>
    )
}
