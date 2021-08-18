import { createContext, useReducer } from "react";

export const ThemeContext = createContext({});

const initialState = {
    background: "#eeeeee",
    foreground: "#000000",
}

function reducer(state, action) {
    switch (action.type) {
        case "DARK":
            return {
                background: {
                    background: "#222222"
                },
                foreground: {
                    foreground: "#ffffff",
                }
            };
        default:
            return state;
    }
}

console.log(initialState)

function ThemeContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <ThemeContext.Provider value={{ state, dispatch }}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContextWrapper