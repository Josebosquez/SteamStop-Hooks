import React, { useContext, useEffect } from 'react'
import "./GameDetails.css"
import ThemeContext from '../../context/ThemeContext'
// import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

function GameDetails(props) {
    let { game } = useParams();

    const { isMode, gameInfo, isLoading, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage, imageArray, setBigImage, bigImage, gameTags, setGameTags, gameGenre, setGameGenre, gameESRB, setGameESRB, gameDescription, setGameDescription} = useContext(ThemeContext)

    if (searchedGameDetails !== []) {
        setGameName(searchedGameDetails.name)
        setRating(searchedGameDetails.rating)
        setPlaytime(searchedGameDetails.playtime)
        setavailablePlatforms(searchedGameDetails.platforms)
        setachievementCount(searchedGameDetails.achievement_count)
        setreleased(searchedGameDetails.released)
        setstores(searchedGameDetails.stores)
        setImage(searchedGameDetails.background_image)
        setGameTags(searchedGameDetails.tags)
        setGameGenre(searchedGameDetails.genres)
        setGameESRB(searchedGameDetails.esrb_rating,)
        setGameDescription(searchedGameDetails.description_raw,)
    }

    useEffect(() => {
        gameInfo(game)
        setBigImage(image)
    }, [])

    async function handleOnImgClick(e) {
        e.preventDefault();
        console.log(e.target.src)
        await setBigImage(e.target.src)
        console.log(bigImage)
    }

    //------- maps ----
    let platformsToRender;
    let storesToRender;
    let imagesToRender
    let GameTagsToRender;
    let GameGenresToRender;
    let GameESRBToRender;
    let GameDescriptionToRender;

    if (gameDescription){
        GameDescriptionToRender = gameDescription
    }

    if (gameESRB) {
        GameESRBToRender = gameESRB.name || '';
    }

    if (gameGenre) {
        GameGenresToRender = gameGenre.map((item) => {
            return (
                <li key={item.id}>
                    {item.name}
                </li>
            );
        })
    }

    if (gameTags) {
        GameTagsToRender = gameTags.map((item) => {
            return (
                <li key={item.id}>
                    {item.name}
                </li>
            );
        })
    }

    if (availablePlatforms) {
        platformsToRender = availablePlatforms.map((item) => {
            return (
                <li key={item.platform.id} >
                    {item.platform.name}
                </li>
            )
        })
    }

    if (stores) {
        storesToRender = stores.map((item) => {
            return (
                <span key={item.store.id}>
                    <a href={`https://${item.store.domain}`} target='_blank' rel="noreferrer">
                        {item.store.name}
                    </a>
                </span>
            );
        })
    }

    if (imageArray) {
        imagesToRender = imageArray.map((item) => {
            return (<div key={item.id} className='imagesDiv'>
                <li>
                    <img className='screenshotImg' src={item.image} alt={item.image} onClick={(e, i) => { handleOnImgClick(e, i) }} />
                </li>
            </div>
            )
        })
    }

    // ------ maps end ----
    return (
        <div>
            <div className='mainPage' style={{ background: isMode ? "lightslategray" : 'black' }}>
                <div className='trailer-images'>
                    <div className='trailer'>
                        <img className='bigImage' src={bigImage} alt={''} />
                    </div>

                    <div className='images'>
                        {imagesToRender}
                    </div>
                </div>

                <div className='infoCenter'>
                    <div className='poster' >
                        <img className='poster' src={image} alt={image} />
                    </div>

                    <div className='gameInfo'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Info </div>
                        <p>Name: {gameName}</p>
                        <p>Rating: {rating}</p>
                        <p>Playtime: {playtime}</p>
                        <div className='platform'>
                            Platforms:{" "}
                            <div className='platformSize'>
                                {platformsToRender}
                            </div>
                        </div>
                        <p>Achievements count: {achievementCount}</p>
                        <p>Release date: {released} </p>
                        <div className='store'>
                            Available Stores:{" "}
                            <div className='storeSize'>
                                {storesToRender}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='bottomPage'>

                <div className="description">
                    {GameDescriptionToRender}
                </div>

                <div className='reviews'>
                    <div>
                        <p className='ptag'>Rating Information</p>
                        <div className='rating'>
                            ESRB: {GameESRBToRender}
                        </div>
                        <br />
                        <div className='ratingSize' >
                            Tags:
                            <div className='OLLI'>
                                <ol>
                                    {GameTagsToRender}
                                </ol>
                            </div>
                        </div>
                        
                        <br/>
                        <div className='rating'>
                            Genre(s):{" "}
                            <div className='ratingSize'>
                                <ul>
                                    {GameGenresToRender}
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
