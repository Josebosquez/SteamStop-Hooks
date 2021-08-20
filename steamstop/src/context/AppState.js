import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

const AppState = (props) => {
    const [isMode, setIsMode] = useState(true)// dark mode
    const [value, setValue] = useState('')
    const [platformSearch, setPlatformSearch] = useState([]) // platforms on the left side of the home page.
    const [isLoading, setIsLoading] = useState(false)
    const [SearchedGameArr, setSearchedGameArr] = useState([])

    //-------- GameDetails state
    const [searchedGameDetails, setSearchedGameDetails] = useState([])
    const [gameName, setGameName] = useState('')
    const [rating, setRating] = useState('')
    const [playtime, setPlaytime] = useState('')
    const [availablePlatforms, setavailablePlatforms] = useState([])
    const [achievementCount, setachievementCount] = useState('')
    const [released, setreleased] = useState('')
    const [stores, setstores] = useState([])
    const [image, setImage] = useState('')
    const [imageArray, setImageArray] = useState([])
    const [bigImage, setBigImage] = useState('')
    //-------- GameDetails bottom of the page state
    const [gameTags, setGameTags] = useState([])
    const [gameGenre, setGameGenre] = useState([])
    const [gameESRB, setGameESRB] = useState([])
    const [gameDescription, setGameDescription] = useState('')

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
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&search=${value}&page_size=50`)

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

    async function gameInfo(game){
        setIsLoading(true)

        try {
            let result = await axios.get(`https://api.rawg.io/api/games/${game}?key=6a456b24916a4165a3ab90808cf6d07c`)
            
            let gameResult = result.data;
            
            if(result.status=== 200){
                setIsLoading(false)
                setSearchedGameDetails(gameResult)
            }
            let screenshots = await axios.get(`https://api.rawg.io/api/games/${game}/screenshots?key=6a456b24916a4165a3ab90808cf6d07c`)
            setImageArray(screenshots.data.results)
            
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    return (
        <ThemeContext.Provider value={{ isMode, setIsMode, platformSearch, Platforms, isLoading, value, setValue, SearchBar, SearchedGameArr, gameInfo, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage, imageArray, setBigImage, bigImage, gameTags, setGameTags, gameGenre, setGameGenre, gameESRB, setGameESRB, gameDescription, setGameDescription }}>


            {props.children}
        </ThemeContext.Provider>
    )
}

export default AppState