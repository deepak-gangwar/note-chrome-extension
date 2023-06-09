export default {
    noteEditor: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem"
    },

    editor_controls: {
        display: "flex",
        // gap: "1rem"
    },

    collapse: {
        userSelect: "none",
        fontSize: "0.8rem",
        opacity: "0.6"
    },

    editor_btn: {
        cursor: "pointer",
        transition: "opacity .25s cubic-bezier(.84, .4, .07, .7)",
    },

    editor_icon: {
        transition: "opacity .25s cubic-bezier(.84, .4, .07, .7)",
        transform: 'scale(0.5)'
    },

    editor_svg: {
        transition: "opacity 0.25s cubic-bezier(.84, .4, .07, .7)",
    },

    editor_svg_save: {
        transition: "opacity 0.25s cubic-bezier(.84, .4, .07, .7)",
        transform: 'translateY(4px) scale(0.82)',
    },

    editor_svg_tick: {
        transition: "opacity 0.25s cubic-bezier(.84, .4, .07, .7)",
        transform: 'translate(-1px, 0px) scale(1.1)',
    }
}
