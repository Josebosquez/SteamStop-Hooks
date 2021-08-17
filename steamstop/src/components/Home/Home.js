import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import "./Home.css"

function Home() {
    return (
        <div>
            <div className='main'>
                <div className='top'>
                    <div className='allPlatforms'>
                        <p className='filteredTitle'>Platforms</p>

                        <div className='searchedPlatformResults'>
                            
                        </div>
                    </div>

                    <div className='input-trending'>
                        <div className='input'>
                            <form className='input'>
                                <input
                                    placeholder='Search bar'
                                />
                                <button>Enter</button>
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

export default Home
