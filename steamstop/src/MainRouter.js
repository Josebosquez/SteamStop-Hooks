import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
const Home = React.lazy(()=> import('./components/Home/Home'))


function MainRouter() {
    return (
        <Router>
            <Navbar/>

            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>

        </Router>
    )
}

export default MainRouter
