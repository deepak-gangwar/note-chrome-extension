import styles from './styles'
import Add from './Add'
import Export from './Export'
import { useState, createContext } from 'react'

export const ToggleToolbar = createContext(null)

export default function AddExportToolbar() {

    const [showAddOrExportOnly, setShowAddOrExportOnly] = useState("none");

    function updateAddOrExport(showComponent) {
        setShowAddOrExportOnly(showComponent)
    }
    return (
        <div style={styles.toolbar_wrap}>
            <ToggleToolbar.Provider value = {{showAddOrExportOnly, updateAddOrExport}}>
                <Add />
                <Export />
            </ToggleToolbar.Provider>
        </div>
    )
}
