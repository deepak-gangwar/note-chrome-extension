import styles from './styles'
import Controls from './Controls'
import { forwardRef } from 'react'

// export default function TitleBar({ title }) {
//     const [componentStyles, setComponentStyles] = useState(styles.titleBar)

//     return (
//         <>
//             <div className='titlebar' style={componentStyles}>
//                 <Controls />

//                 <div className='titlebar_title' style={styles.title}>{title}</div>
//             </div>
//         </>
//     )
// }


const TitleBar = forwardRef(function TitleBar({ title }, whatref) {
    return (
        <div className='titlebar' style={styles.titleBar} ref={whatref}>
            <Controls />

            <div className='titlebar_title' style={styles.title}>{title}</div>
        </div>
    )
})

export default TitleBar
