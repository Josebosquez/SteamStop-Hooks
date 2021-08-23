import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import { ThemeContext } from "../../context/ThemeContext"

import "./PlatformDetails.css"

function PlatformDetails(props) {
    const { isMode, PlatformSearchBar, setValue, setPlatformId, platformSearchErr, platformSearchResultsArray, toggle, setToggle, Platforms, platformSearch, platformNameFunc, platformName } = useContext(ThemeContext)
    const { platform } = useParams()

    useEffect(() => {
        setPlatformId(platform)
        platformNameFunc(platform)

    }, [platform, platformSearch])
    console.log(platformSearchResultsArray)

    function handlePlatformRender(e) {
        e.preventDefault()
        Platforms();
        setToggle(!toggle)
    }

    let platNameRender;
    console.log(platformName)

    if (platformName) {
        platNameRender = platformName.map((item)=>{
        return item.platform.name
        })
        console.log(platNameRender)
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
                        <div className='platformName'> {platNameRender} Platform</div>
                        <div className='input'>
                            <form className='input'>
                                <input placeholder='Search bar'
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <button onClick={(e) => PlatformSearchBar(e)}>Enter</button>
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

                        <p className='filteredTitle'>
                            Upcoming games.
                        </p>

                        <div className='trending'>

                        </div>
                    </div>
                </div>

                <div className='row'>
                    <p className='filteredTitle'>Best Rated Games of All Time!</p>

                    <div className='row1'>

                    </div>
                </div>
                <div className='row'>
                    <p className='filteredTitle'>Corona Virus Games!</p>

                    <div className='row1'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlatformDetails