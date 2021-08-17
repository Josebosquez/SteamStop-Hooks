import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    return (
        <nav className='Navbar'>
            <div className="h1-logo">
                <img className='trainLogo' src='' alt='' />
                <NavLink to='/' className='navlink'>
                    <div>
                        SteamyStop
                    </div>
                </NavLink>
            </div>

            <div className='nav-right-side'>
                <ul>
                    <li>
                        Login
                    </li>
                    <li>
                        Logout
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar