/* eslint-disable no-unused-vars */
import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import  {Register}  from './Components/Register'
import  {Login}  from './Components/Login'
import Track from './Components/Track';

function App() {

  return (
    <>  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='*' element={<Login/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/track'  element={<Track/>}/>
      <Route path='/register' element={<Register/>}/>
    
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
