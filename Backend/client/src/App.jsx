import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';
import Signin from './Pages/Signin';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/sign-in' element={<Signin/>} />
    <Route path='/sign-up' element={<SignUp/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App