import axios from 'axios'
import React, { useState } from 'react'
import ThemeContext from './ThemeContext'

const AppState = (props) => {
    const [isMode, setIsMode] = useState(true)// dark mode
    const [value, setValue] = useState('')
    const [platformSearch, setPlatformSearch] = useState([]) // platforms on the left side of the home page.
    const [isLoading, setIsLoading] = useState(false)
    const [SearchedGameArr, setSearchedGameArr] = useState([])
    const [toggle, setToggle] = useState(false)
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
    const [imageBig, setImageBig] = useState('')
    const [imageArray, setImageArray] = useState([])
    const [bigImage, setBigImage] = useState('')
    const [favoriteToggle, setFavoriteToggle] = useState(false)
    const [favoriteGameArr, setFavoriteGameArr] = useState([])

    //-------- GameDetails bottom of the page state
    const [gameTags, setGameTags] = useState([])
    const [gameGenre, setGameGenre] = useState([])
    const [gameESRB, setGameESRB] = useState([])
    const [gameDescription, setGameDescription] = useState('')

    //-------- Homepage state
    const [trendingArray, setTrendingArray] = useState([])
    const [bestGenreGames, setBestGenreGames] = useState([])
    const [coronaVirus, setCoronaVirus] = useState([])

    //-------- platform state
    const [platformSearchErr, setPlatformSearchErr] = useState('')
    const [platformSearchResultsArray, setPlatformSearchResultsArray] = useState([])
    const [platformTrendingArray, setPlatformTrendingArray] = useState([])
    const [platformBestGenre, setPlatformBestGenre] = useState([])
    const [platformCoronaVirus, setPlatformCoronaVirus] = useState([])
    const [platformName, setPlatformName] = useState('')
    const [platformId, setPlatformId] = useState('')

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
            console.log(newArray)

            if (searchedGame.status === 200) {
                setSearchedGameArr(newArray);
            } 



        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    async function gameInfo(game) {
        setIsLoading(true)
        setSearchedGameArr([])
        setPlatformSearchResultsArray([])

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
            e.status(500).json({ message: e })
            setIsLoading(false)
        }
    }

    // --------- home page trending ------
    async function Trending() {
        setIsLoading(true)
        try {
            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&ordering=-added&page=1&page_size=1`) // change size to more when i figured it out

            let newArray = trending.data.results

            if (trending.status === 200) {
                setTrendingArray(newArray)
                setIsLoading(false)
            }

        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    async function Rows() {
        try {
            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&metacritic=90,100&page=1&page_size=8`)

            let newArray = genre.data.results

            if (genre.status === 200) {
                setIsLoading(false)
                setBestGenreGames(newArray)
            }

            let genre1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2020-01-01,2021-07-01&metacritic=85,100&page=1&page_size=8`)

            let newArray2 = genre1.data.results

            if (genre1.status === 200) {
                setCoronaVirus(newArray2)
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    // --------- platform home page ------

    async function platformNameFunc(platform){
        try {
            let result = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&platforms=${platform}`)

            setPlatformName( result.data.results[0].platforms.filter((item) => {
                return item.platform.id == platform
            })
            )
    } catch (e){
        console.log(e)
    }
    }

    async function PlatformSearchBar(e) {
        e.preventDefault();

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&platforms=${platformId}&search=${value}`)

            let newArray = searchedGame.data.results
            console.log(newArray)

            if (searchedGame.status === 200)  {
                setPlatformSearchResultsArray(newArray)
                setPlatformSearchErr('');
            } else {
                setPlatformSearchResultsArray([])
            }

            { searchedGame.data.count === 0 ? setPlatformSearchErr(`this platform does not support the video game ${value}`) : setPlatformSearchErr('') && setPlatformSearchResultsArray([])};
        } catch (e) {
            console.log(e)
        }
    }

    async function PlatformTrendingFunc(platform){
        try {
            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&platforms=${platform}&ordering=-added&page=1&page_size=1`)

            if (trending.status === 200){
                setPlatformTrendingArray(trending.data.results)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async function closeSearchArrayResults(e){
        e.preventDefault()
        setPlatformSearchResultsArray([])
        setSearchedGameArr([])
    }

    async function PlatformRows(platform) {
        try {
            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&metacritic=90,100&page=1&page_size=8&platforms=${platform}`)

            let newArray = genre.data.results

            if (genre.status === 200) {
                setIsLoading(false)
                setPlatformBestGenre(newArray)
            }

            let genre1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2020-01-01,2021-07-01&metacritic=85,100&page=1&page_size=8&platforms=${platform}`)

            let newArray2 = genre1.data.results

            if (genre1.status === 200) {
                setPlatformCoronaVirus(newArray2)
            }
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }
    return (
        <ThemeContext.Provider value={{ isMode, setIsMode, platformSearch, Platforms, isLoading, value, setValue, SearchBar, SearchedGameArr, gameInfo, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage, imageArray, setBigImage, bigImage, gameTags, setGameTags, gameGenre, setGameGenre, gameESRB, setGameESRB, gameDescription, setGameDescription, Trending, trendingArray, Rows, bestGenreGames, coronaVirus, setImageBig, imageBig, PlatformSearchBar, setPlatformId, platformSearchErr, platformSearchResultsArray, toggle, setToggle, platformNameFunc, platformName, PlatformTrendingFunc, platformTrendingArray, setPlatformSearchResultsArray, setPlatformSearch, closeSearchArrayResults, PlatformRows, platformBestGenre, platformCoronaVirus, favoriteToggle, setFavoriteToggle, favoriteGameArr, setFavoriteGameArr}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default AppState