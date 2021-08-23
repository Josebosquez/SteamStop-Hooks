import React, { useContext, useEffect } from 'react'
import "./GameDetails.css"
import ThemeContext from '../../context/ThemeContext'
// import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

function GameDetails(props) {
    let { game } = useParams();

    const { isMode, gameInfo, searchedGameDetails, gameName, setGameName, rating, setRating, playtime, setPlaytime, availablePlatforms, setavailablePlatforms, achievementCount, setachievementCount, released, setreleased, stores, setstores, image, setImage, imageArray, setBigImage, bigImage, gameTags, setGameTags, gameGenre, setGameGenre, gameESRB, setGameESRB, gameDescription, setGameDescription, setImageBig, imageBig, favoriteToggle, setFavoriteToggle, favoriteGameArr, setFavoriteGameArr } = useContext(ThemeContext)

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
        setImageBig(searchedGameDetails.background_image_additional)
    }

    useEffect(() => {
        gameInfo(game)
        setBigImage(imageBig)
    }, [imageBig, game, setBigImage])

    async function handleOnImgClick(e) {
        e.preventDefault();
        await setBigImage(e.target.src)
    }

    //------- maps ----
    let platformsToRender;
    let storesToRender;
    let imagesToRender
    let GameTagsToRender;
    let GameGenresToRender;
    let GameESRBToRender;
    let GameDescriptionToRender;

    if (gameDescription) {
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
            return (
                <div key={item.id} className='imagesDiv'>
                    <li>
                        <img className='screenshotImg' src={item.image} alt={item.image} onClick={(e, i) => { handleOnImgClick(e, i) }} />
                    </li>
                </div>
            )
        })
    }

    // ------ maps end ----
    async function handleFavSav(e, i) {
        console.log('clicked')
        e.preventDefault();
        setFavoriteToggle(true)
        console.log("current", favoriteGameArr)

        try {
            let newGameArr = [];
                //page rending              // saved games arr
            // check if the game exists or doesnt, return true or false.

            //if true,

            // if false,

            // for (i = 0; i < favoriteGameArr.length; i++){
            //     if(!searchedGameDetails.id === favoriteGameArr.id){
            //         favoriteGameArr.splice(1, searchedGameDetails.id)
            //         console.log("removed:", favoriteGameArr)
            //     } else {
            //         favoriteGameArr.push(searchedGameDetails)
            //         console.log("pushed:", favoriteGameArr)
            //     }
            // }

            if (favoriteToggle){
                favoriteGameArr.push(searchedGameDetails)
                console.log(favoriteGameArr)
                if (searchedGameDetails){
                    searchedGameDetails.filter((item)=>{
                        if (item.id === searchedGameDetails.id){
                            return;
                        } else{

                        }
                    })
                } else 
                
                window.localStorage.setItem('favoriteGameArr', JSON.stringify(favoriteGameArr))
                setFavoriteToggle(false)
                console.log(favoriteToggle)
            } else {
                window.localStorage.removeItem('favoriteGameArr', JSON.stringify(favoriteGameArr.id))
            }
        } catch (e) {
            console.log(e)
            setFavoriteToggle(false)
        }
    }

    return (
        <div style={{ background: isMode ? "lightslategray" : 'black', color: isMode ? "black" : "white" }}>
            <div className='mainPage'>
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
                            <p className='platformSize'>
                                {platformsToRender}
                            </p>
                        </div>
                        <p>Achievements count: {achievementCount}</p>
                        <p>Release date: {released} </p>
                        <div className='store'>
                            Available Stores:{" "}
                            <p className='storeSize'>
                                {storesToRender}
                            </p>
                        </div>
                        <button style={{width: '20%', marginLeft: '40%' }} onClick={(e) => {
                            handleFavSav(e)
                        }}>Save to favorites</button>
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

                        <br />
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
