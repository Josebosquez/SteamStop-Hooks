import React, { useContext, useEffect } from 'react'

import { NavLink } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext';
import checkAuthCookie from '../hooks/checkAuthCookie'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import "./Navbar.css";

function Navbar(props) {
    const { isMode, setIsMode } = useContext(ThemeContext)
    const { logUserIn } = checkAuthCookie();

    useEffect(() => {
        logUserIn();
    }, [])

    const { state: { user }, dispatch} = useContext(AuthContext)

    const isUserLoggedIn = user ? true : false;
    const navLinkTitleOne = isUserLoggedIn ? "Profile" : '/login'
    const navLinkDisplayOne = isUserLoggedIn ? `${user.email}` : "login"
    const navLinkTitleTwo = isUserLoggedIn ? "/logout" : "/sign-up"
    const navLinkDisplayTwo = isUserLoggedIn ? "Logout" : "Sign up";

    const logoutButton = isUserLoggedIn ? logout : () => { }

    async function logout() {
        try {
            let result = await axios.get('http://localhost:3001/api/users/logout')
            console.log(result)
            dispatch({
                type: "LOG_OUT"
            })

            Cookies.remove("jwt-cookie")
            props.history.push('/login')

        } catch (e) {
            console.log(e)
        }
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
                        <NavLink activeStyle={{ color: 'red' }} exact to={navLinkTitleOne}>
                            {navLinkDisplayOne}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeStyle={{ color: 'red' }} exact to={navLinkTitleTwo} onClick={()=> logoutButton()}>
                            {navLinkDisplayTwo}
                        </NavLink>
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

export default withRouter(Navbar)

// import React, { useContext } from 'react'
// import { NavLink } from 'react-router-dom';
// import "./Navbar.css";

// import {ThemeContext} from '../../context/ThemeContext';

// function Navbar() {
//     const { isMode, setIsMode } = useContext(ThemeContext)

//     return (
//         <nav className='Navbar'>
//             <div className="h1-logo">
//                 <img className='trainLogo' src='' alt='' />
//                 <NavLink to='/' className='navlink'>
//                     <div>
//                         SteamyStop
//                     </div>
//                 </NavLink>
//             </div>

//             <div className='nav-right-side'>
//                 <ul>
//                     <li>
//                         Login
//                     </li>
//                     <li>
//                         Logout
//                     </li>
//                 </ul>
//                 {isMode ? (
//                 <button onClick={() => setIsMode(false)}> Light Mode</button>
//                     ) : (
//                         <button onClick={() => setIsMode(true)}> Dark Mode</button>
//                 )}

//             </div>
//         </nav>
//     )
// }

// export default Navbar