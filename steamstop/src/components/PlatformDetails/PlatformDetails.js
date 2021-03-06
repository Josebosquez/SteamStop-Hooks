import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ThemeContext } from "../../context/ThemeContext"

import "./PlatformDetails.css"

function PlatformDetails(props) {
    const { isMode, PlatformSearchBar, setValue, setPlatformId, platformSearchErr, platformSearchResultsArray, toggle, setToggle, Platforms, platformSearch, platformNameFunc, platformName, PlatformTrendingFunc, platformTrendingArray, setPlatformSearchResultsArray, closePlatformSearchResultsArray, PlatformRows, platformBestGenre, platformCoronaVirus } = useContext(ThemeContext)
    const { platform } = useParams()

    useEffect(() => {
        setPlatformId(platform)
        platformNameFunc(platform)
        PlatformTrendingFunc(platform)
        PlatformRows(platform)
    }, [platform, platformSearch])

    function handlePlatformRender(e) {
        e.preventDefault()
        Platforms();
        setToggle(!toggle)
        setPlatformSearchResultsArray([])
    }

    let platNameRender;
    let platTrendingRender;
    let RenderBestGamesGenre;
    let RenderCorona;

    if (platformName) {
        platNameRender = platformName.map((item) => {
            return item.platform.name
        })
    }

    if (platformTrendingArray.length >= 0){
        platTrendingRender = platformTrendingArray.map((item, i) => {
            return <Link key={item.id} to={{ pathname: `/game-detail/${item.id}` }}>
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
                                return <span key={item.id}>
                                    <li >
                                    {item.platform.name}
                                </li>
                                    </span>
                            })}
                        </p>
                        <p className='trendingGameTitle'>
                            Esrb rating: {item.esrb_rating?.name || ""}
                        </p>
                    </div>
                </div>
            </Link>
        })
    } else {
        platTrendingRender = "There are no available games at this time"
    }

    if (platformBestGenre.length > 0) {
        RenderBestGamesGenre = platformBestGenre.map((item, i) => {
            return <div key={i.id} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    } else {
        RenderBestGamesGenre = "There are no available games at this time"
    }

    if (platformCoronaVirus.length>0) {
        RenderCorona = platformCoronaVirus.map((item, i) => {
            return <div key={i.id} className='rowResults'>
                <Link to={{ pathname: `/game-detail/${item.id}` }}>
                    <img className='img' src={item.background_image} alt={item.background_image} />
                    <p className='searchResultsText'>{item.name}</p>
                </Link>
            </div>
        })
    } else {
        RenderCorona = "There are no available games at this time"
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
                        <br/>
                        <div className='platformName'> {platNameRender} Platform</div>
                        <div className='input'>
                            <form className='input'>
                                <input placeholder='Search bar'
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <button onClick={(e) => PlatformSearchBar(e)}>Enter</button>

                                <button onClick={(e) => closePlatformSearchResultsArray(e)}>Close</button>
                            </form>
                            <div className="platformerrorMessage">
                                {platformSearchErr && platformSearchErr}
                            </div>
                        </div>

                        <div className='searchedGameResults'>
                            {platformSearchResultsArray.map((item) => {
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
                            {platTrendingRender}
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

export default PlatformDetails