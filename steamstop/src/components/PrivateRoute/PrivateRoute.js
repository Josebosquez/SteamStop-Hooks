import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import CheckAuthCookie from '../hooks/checkAuthCookie'

function PrivateRoute({component: Component, ...rest}) {
    const { state: user } = useContext(AuthContext)
    const {checkIfCookieExists} = CheckAuthCookie();

    return (
        <Route 
        {...rest} 
        render={(props) => checkIfCookieExists() 
            ? <Component {...props}/> 
            : <Redirect to="/login"/>
        }/>
    )
}

export default PrivateRoute
