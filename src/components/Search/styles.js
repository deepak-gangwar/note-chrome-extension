export default {
    search: {
        padding: "1.2rem 2.5rem 0.8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    bar: {
        light: {
            background: "#fff",
            outline: "none",
            border: "0",
            display: "inline",
            width: "100%",
            height: "2.4rem",
            padding: "0 2rem",
            fontSize: "0.8rem",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
        },

        dark: {
            background: "#262626",
            outline: "none",
            display: "inline",
            width: "100%",
            height: "2.4rem",
            padding: "0 2rem",
            fontSize: "0.8rem",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderBottomWidth: "0",
            borderRightWidth: "0",
        },
    },

    button: {
        light: {
            cursor: "pointer",
            height: "2.4rem",
            display: "inline-block",
            width: "25%",
            backgroundColor: "#232323",
            color: "#f5f5f5",
            textAlign: "center",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
        },

        dark: {
            cursor: "pointer",
            height: "2.4rem",
            display: "inline-block",
            width: "25%",
            backgroundColor: "#262626",
            color: "#f5f5f5",
            textAlign: "center",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderBottomWidth: "0",
            borderLeftWidth: "0",
        }
    },

    keyboard_shortcut: {
        position: "absolute",
        transform: "scale(0.4)",
        right: "17%",
        pointerEvents: "none",

        color: {
            light: "#00000060",
            dark: "#ffffff60"
        }
    },

    search_icon: {
        width: "100%",
        height: "100%",
        transform: "translateY(0px) scale(0.45)",
        // transform: "translateY(-2px) scale(0.4)"
    }
}
