import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppState from './context/AppState'

import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const Home = React.lazy(() => import('./components/Home/Home'))
const PlatformDetails = React.lazy(() => import('./components/PlatformDetails/PlatformDetails'))
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'))
const GameDetails = React.lazy(() => import("./components/GameDetails/GameDetails"))
const Auth = React.lazy(() => import("./components/Auth/Auth"))
const Profile = React.lazy(() => import("./components/Profile/Profile"))
const PrivateHome = React.lazy(() => import("./components/privateHome/privateHome"))

function MainRouter() {
    return (
        <Router>
            <AppState>
                <Navbar />
                <Switch>
                    <Route exact path="/sign-up" component={Auth} />
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/game-detail/:game" component={GameDetails} />
                    <Route exact path='/platform-search/:platform' component={PlatformDetails} />
                    
                    <PrivateRoute exact path='/profile' component={Profile}/>
                    <PrivateRoute exact path='/home' component={PrivateHome}/>

                    <Route exact path='/' component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </AppState>
        </Router>
    )
}

export default MainRouter