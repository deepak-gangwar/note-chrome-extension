import { useState, useEffect } from "react"

// CUSTOM HOOK TO UPDATE USER THEME BASED ON SYSTEM PREFERENCES
// ============================================================

export const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())
    const mqListener = (e => {
        setIsDarkTheme(e.matches)
    })

    useEffect(() => {
        // dark theme media query
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
        darkThemeMq.addEventListener('change', mqListener)
        return () => darkThemeMq.removeEventListener('change', mqListener)
    }, [])
    return isDarkTheme
}
