import axios from 'axios'
import React, { useState } from 'react'
import PlatformContext from "../PlatformContext/PlatformContext"

const PlatformState = (props) => {
    

    return (
        <ThemeContext.Provider value={{ }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default PlatformState
