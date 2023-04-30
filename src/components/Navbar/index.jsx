import styles from './styles'

export default function Navbar() {
    return (
        <nav className='chromenote-navbar' style={styles.navbar} >
            {/* ============== LOGO ============== */}
            <div className="chromenote-logo" style={styles.logo_wrap}>
                <svg style={styles.logo} width="59" height="26" viewBox="0 0 59 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.79023 21V10.7947L11.6632 21H14.8335V4.80115H11.4086V15.0064L4.53568 4.80115H1.38847V21H4.79023Z" fill="#232323" />
                    <path d="M32.4081 7.78637H37.0827V21H40.5538V7.78637H45.2515V4.80115H32.4081V7.78637ZM47.0965 21H58.2274V18.0148H50.5677V14.2659H56.5844V11.4195H50.5677V7.78637H57.9728V4.80115H47.0965V21Z" fill="#232323" />
                    <path d="M32.4357 15.258H27.7094L30.9328 18.6563L28.8425 20.6396L25.7009 17.3281V21.8922H22.8195V17.3281L19.6791 20.6396L17.5889 18.6563L20.8123 15.258H16.0859V12.1767H20.8123L17.5889 8.77848L19.6791 6.79512L22.8195 10.1066V5.54248H25.7009V10.1066L28.8425 6.79512L30.9328 8.77848L27.7094 12.1767H32.4357V15.258Z" fill="#232323" />
                </svg>
            </div>

            {/* ============= SETTINGS ============= */}
            <div className="chromenote-settings" style={styles.settings_icon}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.9993" cy="12.9998" r="1.08333" fill="#33363F" stroke="#33363F" strokeWidth="0.83871" strokeLinecap="round" />
                    <circle cx="6.49935" cy="12.9998" r="1.08333" fill="#33363F" stroke="#33363F" strokeWidth="0.83871" strokeLinecap="round" />
                    <circle cx="19.4993" cy="12.9998" r="1.08333" fill="#33363F" stroke="#33363F" strokeWidth="0.83871" strokeLinecap="round" />
                </svg>
            </div>
        </nav>
    )
}
