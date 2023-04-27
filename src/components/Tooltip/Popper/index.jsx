import styles from './styles'

export default function Popper() {
    return (
        <div className="parent_wrapper" style={styles.parent_wrapper}>
            <div className="popper" style={styles.popper}>
                <div className="tooltip_container" style={styles.tooltip_container}>
                    <div className="tooltip" style={styles.tooltip}>
                        <div>
                            <div className="list" style={styles.list}>
                                <div className="first_item" style={styles.first_item}>
                                    <div className="highlighter_wrapper" style={styles.highlighter_wrapper}>
                                        <div>
                                            <span>
                                                <a href="" className="highlighter" style={styles.highlighter}>
                                                    <svg width="25" height="25" viewBox="0 0 25 25">
                                                        <path d="M13.7 15.96l5.2-9.38-4.72-2.62-5.2 9.38 4.72 2.62zm-.5.89l-1.3 2.37-1.26.54-.7 1.26-3.8-.86 1.23-2.22-.2-1.35 1.31-2.37 4.73 2.62z" fillRule="evenodd"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="nothing" style={styles.nothing}>
                                        <div></div>
                                    </div> */}
                                </div>
                                <div className="separator" style={styles.separator}></div>
                                <div className="first_item" style={styles.first_item}>
                                    <div className="highlighter_wrapper" style={styles.twitter_wrapper}>
                                        <div>
                                            <span>
                                                <a href="" className="highlighter " style={styles.highlighter}>
                                                    <svg style={styles.icon_add} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7586 3.00598C13.2404 3 12.6591 3 12 3C9.20435 3 7.80653 3 6.7039 3.45672C5.23373 4.06569 4.06569 5.23373 3.45672 6.7039C3 7.80653 3 9.20435 3 12V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H12C14.7956 21 16.1935 21 17.2961 20.5433C18.7663 19.9343 19.9343 18.7663 20.5433 17.2961C21 16.1935 21 14.7956 21 12C21 11.3409 21 10.7596 20.994 10.2414C20.464 10.7133 19.7655 11 19 11C17.3431 11 16 9.65685 16 8C14.3431 8 13 6.65685 13 5C13 4.23453 13.2867 3.53602 13.7586 3.00598ZM9 8.99966C8.44772 8.99966 8 9.44738 8 9.99966C8 10.5519 8.44772 10.9997 9 10.9997H15C15.5523 10.9997 16 10.5519 16 9.99966C16 9.44738 15.5523 8.99966 15 8.99966H9ZM9 12.9997C8.44772 12.9997 8 13.4474 8 13.9997C8 14.5519 8.44772 14.9997 9 14.9997H12C12.5523 14.9997 13 14.5519 13 13.9997C13 13.4474 12.5523 12.9997 12 12.9997H9Z" fill="#ffffff" fillOpacity="1" />
                                                        <path d="M19 8L19 2M16 5H22" stroke="#ffffff" strokeOpacity="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator" style={styles.separator}></div>
                                <div className="last_item" style={styles.last_item}>
                                    <div>
                                        <span>
                                            <a href="" className='twitter_share' style={styles.twitter_share}>
                                                <svg width="25" height="25" viewBox="0 0 25 25">
                                                    <path fill='white' d="M22.3 4.3c-.82.51-1.72.88-2.67 1.08a4.25 4.25 0 0 0-6.18-.12 4.3 4.3 0 0 0-1.26 3.03c0 .34.04.67.08 1a12.2 12.2 0 0 1-8.81-4.52 4.8 4.8 0 0 0-.62 2.14 4.44 4.44 0 0 0 1.92 3.6 4.13 4.13 0 0 1-1.91-.55v.07c0 2.06 1.47 3.8 3.44 4.21-.37.08-.74.13-1.15.15l-.76-.07a4.32 4.32 0 0 0 3.98 2.99A9.03 9.03 0 0 1 3 19.14l-1-.06A12.26 12.26 0 0 0 8.6 21c7.88 0 12.2-6.55 12.17-12.18.02-.23.02-.41 0-.62a8.06 8.06 0 0 0 2.15-2.23c-.77.37-1.6.6-2.45.7a4.1 4.1 0 0 0 1.84-2.38"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tail" style={styles.tail}>
                        <div className="tail_segment" style={styles.tail_segment}></div>
                        {/* They have done it using ::after but I am making it a span */}
                    </div>
                </div>
            </div>
        </div>
    )
}
