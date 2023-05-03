export default {
    navbar: {
        padding: "0 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1rem",
    },

    logo_wrap: {
        width: "fit-content",
    },

    logo: {
        light: {
            transformOrigin: "left",
            transform: "translateY(4px) scale(0.8)",
            fill: "#232323",
        },

        dark: {
            transformOrigin: "left",
            transform: "translateY(4px) scale(0.8)",
            fill: "#ffffff",
        },
    },

    settings_icon: {
        transform: "translateY(3px)",
    },

    settings_icon_svg: {
        light: {
            fill: "#33363F",
            stroke: "#33363F",
        },

        dark: {
            fill: "#ffffff",
            stroke: "#ffffff",
        }
    }
}
