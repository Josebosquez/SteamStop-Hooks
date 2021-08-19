import React, {useContext, useState, useEffect} from 'react'
import "./GameDetails.css"
import ThemeContext from '../../context/ThemeContext'
// import { Link } from 'react-router-dom'
import {useParams} from "react-router-dom";

function GameDetails(props) {
    let { game } = useParams();
    console.log(props)

    const { isMode, gameInfo, isLoading, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage} = useContext(ThemeContext)

    if(searchedGameDetails !== []){
        setGameName(searchedGameDetails.name)
        setRating(searchedGameDetails.rating)
        setPlaytime(searchedGameDetails.playtime)
        setavailablePlatforms(searchedGameDetails.platforms)
        setachievementCount(searchedGameDetails.achievement_count)
        setreleased(searchedGameDetails.released)
        setstores(searchedGameDetails.stores)
        setImage(searchedGameDetails.background_image)

    }
    console.log(gameName)

    useEffect(() => {
        gameInfo(game)
    }, [])

    return (
        <div>
            <div className='mainPage' style={{ background: isMode ? "lightslategray" : 'black' }}>
                <div className='trailer-images'>
                    <div className='trailer'>
                        <img className='bigImage' src={''} alt={''} />
                    </div>

                    <div className='images'>
                        
                    </div>
                </div>

                <div className='infoCenter'>
                    <div className='poster' >
                        
                    </div>

                    <div className='gameInfo'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Info </div>
                        <p>Name: {gameName}</p>
                        <p>Rating: {rating}</p>
                        <p>Playtime: {playtime}</p>
                        <div className='platform'>
                            Platforms:{" "}
                            <div className='platformSize'>
                                {/* {availablePlatforms.map((item) => {
                                    return (
                                        <span key={item.id}>
                                            <li>
                                                {item.name}
                                            </li>
                                        </span>
                                    );
                                })} */}
                            </div>
                        </div>
                        <p>Achievements count: {achievementCount}</p>
                        <p>Release date: {released} </p>
                        <div className='store'>
                            Available Stores:{" "}
                            <div className='storeSize'>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>





            <div className='bottomPage'>

                <div className="description">
                    
                </div>

                <div className='reviews'>
                    <div>
                        <p className='ptag'>Rating Information</p>
                        <div className='rating'>
                            
                        </div>
                        <br />
                        <div className='ratingSize' >
                            Tags:
                            <div className='OLLI'>
                                <ol>
                                    
                                </ol>
                            </div>
                        </div>
                        <div className='rating'>
                            Genre(s):{" "}
                            <div className='ratingSize'>
                                <ul>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetails
