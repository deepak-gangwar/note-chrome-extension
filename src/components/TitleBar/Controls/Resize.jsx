import styles from './styles'

const style = {}

export default function Resize({ showIcon, onMouseClick }) {
    let iconStyle = {
        ...styles.resize.icon,
        opacity: showIcon ? 1 : 0
    };

    let componentStyle = { ...styles.resize.button, ...style };
    if (!showIcon) {
        componentStyle = { ...componentStyle, ...styles.resize.button };
    }

    let icon
    icon = window && window.devicePixelRatio > 1.5 ? (
        <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 20 20" style={iconStyle}>
            <path fill="#006400" d="M5.3,16H13L4,7v7.7C4.6,14.7,5.3,15.4,5.3,16z" />
            <path fill="#006400" d="M14.7,4H7l9,9V5.3C15.4,5.3,14.7,4.6,14.7,4z" />
        </svg>
    ) : (
        <svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" style={iconStyle}>
            <path fill="#006400" d="M2,3c0,0 0,2.744 0,4.167c0,0.221 0.088,0.433 0.244,0.589c0.156,0.156 0.368,0.244 0.589,0.244c1.423,0 4.167,0 4.167,0l-5,-5Z" />
            <path fill="#006400" d="M8,7c0,0 0,-2.744 0,-4.167c0,-0.221 -0.088,-0.433 -0.244,-0.589c-0.156,-0.156 -0.368,-0.244 -0.589,-0.244c-1.423,0 -4.167,0 -4.167,0l5,5Z" />
        </svg>
    );

    return (
        <a onClick={onMouseClick} style={componentStyle} >
            {icon}
        </a>
    );
}
