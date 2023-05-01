export default {
    panel: {
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        lineHeight: "1.5",
        fontWeight: "400",
        textRendering: "optimizeLegibility",
        width: "410px",
        height: "550px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        position: "fixed",
        top: "20px",
        right: "20px",
        boxShadow: "3px 3px 14px rgba(1, 1, 1, 0.2)",
        transition: "opacity .25s cubic-bezier(.84, .4, .07, .7)",
        zIndex: "10000"
    },

    notes_list: {
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitAppRegion: 'drag',
        listStyleType: "none",
        height: "340px",
        overflowY: "scroll",
        padding: 0,
        margin: 0,
        paddingLeft: "17px",
        boxShadow: "inset 0 -20px 14px -20px rgba(1, 1, 1, 0.1)",
    },

    notes_list_item: {
        position: "relative",
    }
}
