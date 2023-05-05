export default {
    btn_wrap: {
        boxShadow: "0 4px 14px rgba(1, 1, 1, 0.05)",
        width: "100%",
        // height: "100%",
        height: "calc(70px - 1.9rem)",
    },

    add_btn: {
        light: {
            border: "0",
            background: "#FFFFFF",
            borderRadius: "10px",
            cursor: "pointer",
            paddingLeft: "1rem",
            fontWeight: "bolder",
            textTransform: "uppercase",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
        },

        dark: {
            border: "0",
            backgroundColor: "rgb(29, 32, 35)",
            boxShadow: "rgba(255, 255, 255, 0.1) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.18) 0px 0.60323px 0.60323px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.29021px 2.29021px -2.5px, rgba(0, 0, 0, 0.063) 0px 10px 10px -3.75px",
            borderRadius: "10px",
            cursor: "pointer",
            paddingLeft: "1rem",
            fontWeight: "bolder",
            textTransform: "uppercase",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
    },

    icon: {
        opacity: "0.6",
        marginRight: "8px",
    },

    icon_svg: {
        transform: "translateY(-2px) scale(0.56)",
        transformOrigin: "bottom"
    },

    label: {
        color: "#232323",
        opacity: "0.6",
    },
}
