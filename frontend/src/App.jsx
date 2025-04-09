import React from 'react'
import "./App.css"
import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NoPage from './pages/NoPage'
import Editior from './pages/Editior'
import About from './pages/About'
import Contact from './pages/Contact'

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/>} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/editior/:projectID' element={isLoggedIn ? <Editior /> : <Navigate to="/login"/>} />
          <Route path="*" element={isLoggedIn ? <NoPage />: <Navigate to="/login"/>} />
        </Routes></BrowserRouter>
    </>
  )
}

export default App
