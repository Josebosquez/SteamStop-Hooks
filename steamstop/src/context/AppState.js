import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

const AppState = (props) => {
    const [isMode, setIsMode] = useState(true)// dark mode
    const [value, setValue] = useState('')
    const [platformSearch, setPlatformSearch] = useState([]) // platforms on the left side of the home page.
    const [isLoading, setIsLoading] = useState(false)
    const [SearchedGameArr, setSearchedGameArr] = useState([])

    console.log(value)
    async function Platforms() {
        setIsLoading(true)
        try {
            let result = await axios.get('https://api.rawg.io/api/platforms?key=6a456b24916a4165a3ab90808cf6d07c')

            let newArray = result.data.results

            if (result.status === 200) {
                setPlatformSearch(newArray)
                setIsLoading(false)
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    async function SearchBar(e) {
        e.preventDefault();
        setIsLoading(true)

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&search=${value}&page_size=100`)

            let newArray = searchedGame.data.results

            if (searchedGame.status === 200) {
                setSearchedGameArr(newArray)
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    return (
        <ThemeContext.Provider value={{ isMode, setIsMode, platformSearch, Platforms, isLoading, value, setValue, SearchBar, SearchedGameArr }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default AppState
