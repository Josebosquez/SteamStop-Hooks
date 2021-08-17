import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
// import Spinner from './components/Spinner/Spinner'
import MainRouter from './MainRouter'
import AuthContextWrapper from "./context/AuthContext"

function App() {
  return (
    <div>
      <MainRouter/>
    </div>
  )
}

export default App