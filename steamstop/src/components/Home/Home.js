import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { ThemeContext } from "../../context/ThemeContext"
// import Spinner from "../Spinner/Spinner"

function Home() {
    const { isMode, Trending, Platforms, platformSearch, setValue, SearchBar, SearchedGameArr, trendingArray, Rows, bestGenreGames, coronaVirus, toggle, setToggle, setPlatformSearch, closeSearchArrayResults } = useContext(ThemeContext)

    useEffect(() => {
        Trending();
        Rows();
    }, [])

    let trendingArrayToRender;
    let RenderBestGamesGenre;
    let RenderCorona;

    if (trendingArray) {
        trendingArrayToRender = trendingArray.map((item, i) => {
            return <Link key={i.id} to={{ pathname: `/game-detail/${item.id}` }}>
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
                            Consoles: {item.platforms.map((item, i) => {
                                return <li key={i}>
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

    if (bestGenreGames) {
        RenderBestGamesGenre = bestGenreGames.map((item, i) => {
            return <div key={i.id} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    }

    if (coronaVirus) {
        RenderCorona = coronaVirus.map((item, i) => {
            return <div key={i.id} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    }

    function handlePlatformRender(e) {
        e.preventDefault()
        Platforms();
        setToggle(!toggle)
        setPlatformSearch([])
    }

    return (
        <div style={{ background: isMode ? "lightslategray" : 'black', color: isMode ? "black" : "white" }}>
            <div className='main'>
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
                                    })}
                                </div>
                            </div>
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
                                {platformSearch ? <button onClick={(e) => closeSearchArrayResults(e)}>Close</button> : <div></div>}
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