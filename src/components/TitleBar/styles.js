export default {
    titleBar: {
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitAppRegion: 'drag',
        // cursor: 'default',
        cursor: 'move',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        minHeight: '22px',
        backgroundImage:
            '-webkit-linear-gradient(top, #ededed 0, #ededed 1px, #e7e7e7 2px, #d1d1d1 100%)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#afafaf',
        // borderTopWidth: '1px',
        // borderTopStyle: 'solid',
        // borderTopColor: '#f6f6f6',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        // paddingLeft: '3px',
        // paddingRight: '3px',
        textAlign: 'center',
    },

    title: {
        WebkitUserSelect: 'none',
        userSelect: 'none',
        cursor: 'move',
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
        fontSize: '13px',
        letterSpacing: '0px',
        color: '#4d4d4d',
        flexGrow: '1',
        flexShrink: '1',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
}
