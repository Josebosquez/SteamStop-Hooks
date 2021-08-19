import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

import {ThemeContext} from '../../context/ThemeContext';

function Navbar() {
    const { isMode, setIsMode } = useContext(ThemeContext)

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
                {isMode ? (
                <button onClick={() => setIsMode(false)}> Light Mode</button>
                    ) : (
                        <button onClick={() => setIsMode(true)}> Dark Mode</button>
                )}

            </div>
        </nav>
    )
}

export default Navbar