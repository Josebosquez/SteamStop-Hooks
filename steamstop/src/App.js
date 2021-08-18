import React, {useContext} from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Spinner from './components/Spinner/Spinner'
import MainRouter from './MainRouter'
import AuthContextWrapper from "./context/AuthContext"
import "./App.css"

import ThemeContextWrapper from './context/ThemeContext'

function App() {

  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <ThemeContextWrapper>
            <MainRouter />
          </ThemeContextWrapper>
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  )
}

export default App