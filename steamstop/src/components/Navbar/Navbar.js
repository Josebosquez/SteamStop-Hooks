import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { withRouter } from 'react-router-dom'


import { ThemeContext } from '../../context/ThemeContext';

function Navbar(props) {
    const {state: {backGround, foreground}, dispatch} = useContext(ThemeContext)

        console.log('hello')
        console.log(props)
    
        function handleTheme(e) {
        console.log(1)
        return (<div>
            i am styled by theme context
        </div>)
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
                {/* <button >Light/Dark Mode</button> */}
                <button onClick={(e) => { handleTheme() }}>Light/Dark Mode</button>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)