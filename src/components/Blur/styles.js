export default {
    blur_wrap: {
        light: {
            width: "100%",
            height: "80%",
            position: "absolute",
            zIndex: "3",
            transition: "all .25s cubic-bezier(.84, .4, .07, .7)",
            backdropFilter: "saturate(180%) blur(9px)",
            background: "hsla(0, 0%, 96%, 0.8)",
            opacity: "0.9",
        },

        dark: {
            width: "100%",
            height: "80%",
            position: "absolute",
            zIndex: "3",
            transition: "all .25s cubic-bezier(.84, .4, .07, .7)",
            backdropFilter: "saturate(180%) blur(3px)",
            background: "hsla(230, 13.0%, 9.0%, 0.8)",
            opacity: "0.9",
        },

    }
}
