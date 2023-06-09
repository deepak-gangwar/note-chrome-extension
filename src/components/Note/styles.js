export default {
    note_wrap: {
        light: {
            cursor: "pointer",
            boxSizing: "border-box",
            width: "calc(100% - 5rem + 33px)",
            // width: "calc(100% - 5rem + 15px)",
            fontSize: "0.9rem",
            margin: "8px auto",
            padding: "0.1rem 0",
            borderRadius: "10px",
            // transition: "all .2s linear",
            // transform: "translateX(9px)",
            transformOrigin: "center",
            transition: "all .2s cubic-bezier(.84, .4, .07, .7)",
            background: "#a89fca",
            color: "#232323",
        },

        dark: {
            cursor: "pointer",
            boxSizing: "border-box",
            width: "calc(100% - 5rem + 33px)",
            // width: "calc(100% - 5rem + 15px)",
            fontSize: "0.9rem",
            margin: "8px auto",
            padding: "0.1rem 0",
            borderRadius: "10px",
            // transition: "all .2s linear",
            // transform: "translateX(9px)",
            transformOrigin: "center",
            transition: "all .2s cubic-bezier(.84, .4, .07, .7)",
            background: "#25262b",
            // color: "#868f97",
            // color: "#f3f3f3",
            // color: "rgb(161, 161, 170)", // neon yellow color
            color: "#aaabb5",
        }
    },

    activeNote_wrap: {
        cursor: "default",
        boxSizing: "border-box",
        width: "calc(100% - 5rem)",
        fontSize: "0.9rem",
        margin: "5px auto",
        padding: "0.1rem 1rem",
        borderRadius: "10px",
        background: "#ddd7f0",
        color: "#232323",
    },

    content_wrap: {
        padding: "1rem 0",
    },

    note_content: {
        // marginBlockStart: "1em",
        // marginBlockEnd: "1em",
        marginBlockStart: "0",
        marginBlockEnd: "0",
        padding: "0 1rem",
        whiteSpace: "pre-wrap",
        display: "block",
        outline: "none",
    }
}
