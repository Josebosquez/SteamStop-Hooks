import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ThemeContext  from './ThemeContext'


const AppState = (props) => {
    const [isMode, setIsMode] = useState(true)// dark mode

    const [platformSearch, setPlatformSearch] = useState([]) // platforms on the left side of the home page.
    const [isLoading, setIsLoading] = useState(false)

    async function Platforms(){
        setIsLoading(true)
        try {
        let result = await axios.get('https://api.rawg.io/api/platforms?key=6a456b24916a4165a3ab90808cf6d07c')

        let newArray = result.data.results

        if (result.status === 200){
            setPlatformSearch(newArray)
            setIsLoading(false)
        }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    return (
        <ThemeContext.Provider value={{isMode, setIsMode, platformSearch,Platforms, isLoading}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default AppState
