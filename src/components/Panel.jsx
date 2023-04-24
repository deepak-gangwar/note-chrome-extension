import styles from '../styles/Panel.module.css'
import Search from './Search'

export default function Panel() {
    return (
        <div className={styles.panel}>
            <Search />
        </div>
    )
}