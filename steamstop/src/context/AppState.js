import React, {useState} from 'react'
import ThemeContext  from './ThemeContext'

const AppState = (props) => {
    const [isMode, setIsMode] = useState(true)

    return (
        <ThemeContext.Provider value={{isMode, setIsMode}}>
            {props.children}

        </ThemeContext.Provider>
    )
}
export default AppState
