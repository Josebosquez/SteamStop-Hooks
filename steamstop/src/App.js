import React, {useContext} from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Spinner from './components/Spinner/Spinner'
import MainRouter from './MainRouter'
import AuthContextWrapper from "./context/AuthContext"
import "./App.css"
import { ThemeContext } from './context/ThemeContext'

function App() {
  const themes = useContext(ThemeContext)

  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <ThemeContext.Provider value={themes.dark}>
            <MainRouter />
          </ThemeContext.Provider>
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  )
}

export default App