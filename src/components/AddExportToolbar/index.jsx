import styles from './styles'
import Add from './Add'
import Export from './Export'
import { useState, createContext } from 'react'
import { useThemeDetector } from '../../hooks/useThemeDetector'

export const ToggleToolbar = createContext(null)

export default function AddExportToolbar() {
    const isDarkTheme = useThemeDetector()
    const [showAddOrExportOnly, setShowAddOrExportOnly] = useState("none");

    function updateAddOrExport(showComponent) {
        setShowAddOrExportOnly(showComponent)
    }
    return (
        <div className='chromenote-bottom_toolbar' style={isDarkTheme ? styles.toolbar_wrap.dark : styles.toolbar_wrap.light}>
            <ToggleToolbar.Provider value={{ showAddOrExportOnly, updateAddOrExport }}>
                <Add />
                <Export />
            </ToggleToolbar.Provider>
        </div>
    )
}
