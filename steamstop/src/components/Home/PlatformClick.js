import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { ThemeContext } from "../../context/ThemeContext"
// import Spinner from "../Spinner/Spinner"

function PlatformClick() {
    const { platformSearch, isLoading } = useContext(ThemeContext)

    return (
        <div className='searchedPlatformResults'>
            {isLoading ? (<div> ...isLoading </div>) 
            : (<div className='platformResults'>
                {platformSearch.map((item) => {
                    return (
                        <Link to={{ pathname: `/platform-search/${item.id}` }} className="itemName" key={item.id}>
                            <span>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>)}
        </div>
    )
}

export default PlatformClick
