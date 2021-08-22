import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Spinner from './components/Spinner/Spinner'
import MainRouter from './MainRouter'
import AuthContextWrapper from "./context/AuthContext"

import "./_base.css"

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
            <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  )
}

export default App