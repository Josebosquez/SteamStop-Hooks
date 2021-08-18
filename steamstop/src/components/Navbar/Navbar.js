import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

import { ThemeContext } from '../../context/ThemeContext';

function Navbar(props) {
    function handleTheme() {
        const Themes = useContext(ThemeContext)
        return (<button style={{ background: Themes.background, color: Themes.foreground }}>
            i am styled by theme context
        </button>)
    }

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
                <button onClick={() => { handleTheme }}>Light/Dark Mode</button>
            </div>
        </nav>
    )
}

export default Navbar