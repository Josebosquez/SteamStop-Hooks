import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { ThemeContext } from "../../context/ThemeContext"
import Spinner from "../Spinner/Spinner"

function Home() {
    const { isMode, Trending, Platforms, platformSearch, isLoading, setValue, SearchBar, SearchedGameArr, trendingArray, Rows, bestGenreGames, coronaVirus } = useContext(ThemeContext)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        Trending();
        Rows();
    }, [])

    let trendingArrayToRender;
    let RenderBestGamesGenre;
    let RenderCorona;
    let platformRender;


    if (bestGenreGames) {
        RenderBestGamesGenre = bestGenreGames.map((item, i) => {
            return <div key={i} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    }

    if (coronaVirus) {
        RenderCorona = coronaVirus.map((item, i) => {
            return <div key={i} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    }

    if (trendingArray) {
        trendingArrayToRender = trendingArray.map((item, i) => {
            return <Link key={i} to={{ pathname: `/game-detail/${item.id}` }}>
                <div className='trending'>
                    <div className='left'>
                        <img className='trendingImg' src={item.background_image} alt={item.background_image} />
                    </div>
                    <div className='right'>
                        <p className='trendingGameTitle'>
                            Name of game: {item.name}
                        </p>
                        <p className='trendingGameTitle'>
                            Release date: {item.released}
                        </p>
                        <p className='trendingGameTitle'>
                            Consoles: {item.platforms.map((item) => {
                                return <li >
                                    {item.platform.name}
                                </li>
                            })}
                        </p>
                        <p className='trendingGameTitle'>
                            Esrb rating: {item.esrb_rating.name}
                        </p>
                    </div>
                </div>
            </Link>
        })
    }

    function handlePlatformRender(e) {
        e.preventDefault()
        Platforms();
        console.log('clicked')
        setToggle(!toggle)
    }

    return (
        <div>
            <div className='main' style={{ background: isMode ? "lightslategray" : 'black' }}>
                <div className='top'>
                    <div className='allPlatforms'>
                        <h6 onClick={(e) => { handlePlatformRender(e) }}> Click me for available Platforms</h6>

                        {toggle
                            ? <div className='searchedPlatformResults'>
                                <div className='platformResults'>
                                    {platformSearch.map((item) => {
                                        return (
                                            <Link to={{ pathname: `/platform-search/${item.id}` }} className="itemName" key={item.id}>
                                                <span>
                                                    {item.name}
                                                </span>
                                            </Link>
                                        )
                                    })} </div> </div>
                            : <div className='blankPlatformResults'> </div>
                        }
                    </div>

                    <div className='input-trending'>
                        <div className='input'>
                            <form className='input'>
                                <input placeholder='Search bar'
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <button onClick={(e) => SearchBar(e)}>Enter</button>
                            </form>
                        </div>

                        <div className='searchedGameResults'>
                            {SearchedGameArr.map((item) => {
                                return (<Link key={item.id} to={{
                                    pathname: `/game-detail/${item.id}`
                                }}>
                                    <div className='searchResults'>
                                        <img className='img' src={item.background_image} alt={item.background_image} />
                                        <p className='searchResultsText'>{item.name}</p>
                                    </div>
                                </Link>
                                )
                            })}
                        </div>

                        <br />
                        <p className='filteredTitle'>
                            Upcoming games.
                        </p>
                        <br />
                        <div className='trending'>
                            {trendingArrayToRender}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <p className='filteredTitle'>Best Rated Games of All Time!</p>

                    <div className='row1'>
                        {RenderBestGamesGenre}
                    </div>
                </div>

                <div className='row'>
                    <p className='filteredTitle'>Corona Virus Games!</p>

                    <div className='row1'>
                        {RenderCorona}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home