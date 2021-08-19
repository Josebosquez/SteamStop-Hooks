import React, {useContext, useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import "./Home.css"
import {ThemeContext} from "../../context/ThemeContext"

function Home(){
    const { isMode, Platforms, platformSearch, isLoading} = useContext(ThemeContext)

    useEffect(() => {
        Platforms();
    }, [])

    return (
        <div>
            <div className='main' style={{ background: isMode ? "lightslategray" : 'black' }}>
                <div className='top'>
                    <div className='allPlatforms'>
                        <p className='filteredTitle'>Platforms</p>

                        <div className='searchedPlatformResults'>
                            {isLoading ? <div> ...loading</div> : <div className='platformResults'>
                                {platformSearch.map((item)=>{
                                return (
                                    <Link to={{ pathname: `/platform-search/${item.id}` }} className="itemName" key={item.id}>
                                    <span>
                                        {item.name}
                                    </span>
                                    </Link>
                                )
                            })}</div>}
                        </div>
                    </div>

                    <div className='input-trending'>
                        <div className='input'>
                            <form className='input'>
                                <input placeholder='Search bar'
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
