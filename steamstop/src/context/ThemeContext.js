import { createContext } from "react";

export const ThemeContext = createContext(themes.light);

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};



export default ThemeContext