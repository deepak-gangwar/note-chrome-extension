import './styles/App.css'
import Panel from './components/Panel'
import Tooltip from './components/Tooltip'
import { useRef } from 'react'

function App() {
    const panelRef = useRef(null)

    function setNewNote(val) {
        panelRef.current.addSelectionFromTooltip(val)
    }

    return (
        <>
            <Tooltip sendNoteToApp={setNewNote} />
            <Panel ref={panelRef} />
        </>
    )
}

export default App
