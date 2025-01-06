/* eslint-disable no-unused-vars */

import  { useState } from 'react';
import {  Routes , Route , BrowserRouter} from 'react-router-dom'
import './App.css'
import  {Register}  from './Components/Register'
import  {Login}  from './Components/Login'
import Track from './Components/Track';
import { UserContext } from './Components/context/UserContext';
import { Private } from './Components/Private';
import Diet from './Components/Diet';

function App() {
  const [loggedUser , setLoggedUser ] = useState(JSON.parse(localStorage.getItem("user")))

  return (
    <>  
    <UserContext.Provider value={{loggedUser ,setLoggedUser}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='*' element={<Login/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/track'  element={<Private Component={Track}/>}/>
      <Route path='/diet'  element={<Private Component={Diet}/>}/>
      <Route path='/register' element={<Register/>}/>
    
    </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  
    </>
  )
}

export default App
