import React, {useContext, useState, useEffect} from 'react'
import "./GameDetails.css"
import ThemeContext from '../../context/ThemeContext'
// import { Link } from 'react-router-dom'
import {useParams} from "react-router-dom";

function GameDetails(props) {
    let { game } = useParams();
    const { isMode, gameInfo, isLoading } = useContext(ThemeContext)

    
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
