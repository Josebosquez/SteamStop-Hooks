import React, {useContext, useEffect} from 'react'
import axios from "axios"
import { Link, useParams} from 'react-router-dom'
import {ThemeContext} from "../../context/ThemeContext"

import "./PlatformDetails.css"

function PlatformDetails(props) {
    const { isMode, PlatformSearchBar, value, setValue, platformId, setPlatformId} = useContext(ThemeContext)
    const {platform} = useParams()

    useEffect(() => {
        setPlatformId(platform)
    }, [platform])



    return (
        <div style={{ background: isMode ? "lightslategray" : 'black', color: isMode ? "black" : "white" }}>
            <div className='main'>
                <div className='top'>
                    <div className='allPlatforms'>
                        <p className='filteredTitle'>Platforms</p>

                        <div className='searchedPlatformResults'>
                
                        </div>
                    </div>

                    <div className='input-trending'>
                    <div className='platformName'> Platform</div>
                        <div className='input'>
                            <form className='input'>
                                <input placeholder='Search bar'
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <button onClick={(e) => PlatformSearchBar(e)}>Enter</button>
                            </form>
                        </div>

                        <div className='searchedGameResults'>

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