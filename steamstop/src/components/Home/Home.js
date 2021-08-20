import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import { ThemeContext } from "../../context/ThemeContext"
import Spinner from "../Spinner/Spinner"

function Home() {
    const { isMode, Trending, Platforms, platformSearch, isLoading, setValue, SearchBar, SearchedGameArr, trendingArray, Rows} = useContext(ThemeContext)
    
    // console.log(Trending)
    
    useEffect(() => {
        Platforms();
        Trending();
        Rows()
    }, [])

    let trendingArrayToRender;

    if (trendingArray){
        trendingArrayToRender = trendingArray.map((item, i)=>{
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

    return (
        <div>
            <div className='main' style={{ background: isMode ? "lightslategray" : 'black' }}>
                <div className='top'>
                    <div className='allPlatforms'>
                        <p className='filteredTitle'>Platforms</p>

                        <div className='searchedPlatformResults'>
                            {isLoading ? <div> <Spinner /></div> : <div className='platformResults'>
                                {platformSearch.map((item) => {
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

                        <p className='filteredTitle'>
                            Upcoming games.
                        </p>

                        <div className='trending'>
                            {trendingArrayToRender}
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
