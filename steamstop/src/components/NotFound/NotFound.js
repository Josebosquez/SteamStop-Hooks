import React from 'react'
import {Link} from "react-router-dom"

function NotFound() {
    return (
        <div className="notFound">
            <h1>
                Sorry, that page doesn't exist. 
            </h1>
            <h1>
                Please go back to the {" "} <Link to ='/'>Home Page</Link>
            </h1>
        </div>
    )
}

export default NotFound