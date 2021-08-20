import axios from 'axios'
import React, { useState } from 'react'
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

    //-------- Homepage state
    const [trendingArray, setTrendingArray] = useState([])
    const [bestGenreGames, setBestGenreGames] = useState([])

    async function Platforms() {
        setIsLoading(true)
        try {
            let result = await axios.get(`https://api.rawg.io/api/platforms?key=${process.env.REACT_APP_KEY}`)

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
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${value}&page_size=50`)

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

    async function gameInfo(game) {
        setIsLoading(true)
        setSearchedGameArr([])

        try {
            let result = await axios.get(`https://api.rawg.io/api/games/${game}?key=${process.env.REACT_APP_KEY}`)

            let gameResult = result.data;

            if (result.status === 200) {
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


    // --------- home page trending ------
    async function Trending(){
        setIsLoading(true)
        try {
            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&ordering=-added&page=1&page_size=1`) // change size to more when i figured it out

            let newArray = trending.data.results

            if (trending.status === 200){
                setTrendingArray(newArray)
                setIsLoading(false)
            }

        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    async function Rows(){
        setIsLoading(true)
        console.log(1)

        try {
            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&metacritic=90,100&page=1&page_size=10`)

            console.log(genre)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    return (
        <ThemeContext.Provider value={{ isMode, setIsMode, platformSearch, Platforms, isLoading, value, setValue, SearchBar, SearchedGameArr, gameInfo, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage, imageArray, setBigImage, bigImage, gameTags, setGameTags, gameGenre, setGameGenre, gameESRB, setGameESRB, gameDescription, setGameDescription, Trending, trendingArray, Rows }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default AppState