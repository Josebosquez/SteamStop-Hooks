import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
const Home = React.lazy(()=> import('./components/Home/Home'))
const PlatformDetails = React.lazy(()=> import('./components/PlatformDetails/PlatformDetails'))
const NotFound = React.lazy(()=> import ('./components/NotFound/NotFound'))

function MainRouter() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path='/platform-search/:platform' component={PlatformDetails} />
                <Route exact path='/' component={Home} />
                <Route component={NotFound}/>
            </Switch>

        </Router>
    )
}

export default MainRouter
