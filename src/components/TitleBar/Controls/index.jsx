import Close from './Close'
import Minimize from './Minimize'
import { useState } from 'react'
import Resize from './Resize';

var styles = {
    controls: {
        WebkitUserSelect: 'none',
        userSelect: 'none',
        cursor: 'default',
        display: 'flex',
        width: '61px',
        position: 'absolute'
    },

    inset: {
        marginLeft: '5px'
    }
};

export default function Controls() {
    const [isOver, setIsOver] = useState(false)

    function handleClose() {
        console.log('Close window')
    }

    function handleMinimize() {
        console.log('Minimize window')
    }

    function handleResize() {
        console.log('Resize window')
    }

    return (
        <div style={styles.controls} onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <Close onMouseClick={handleClose} showIcon={isOver} />
            <Minimize onMouseClick={handleMinimize} showIcon={isOver} />
            <Resize onMouseClick={handleResize} showIcon={isOver} />
        </div>
    )
}
