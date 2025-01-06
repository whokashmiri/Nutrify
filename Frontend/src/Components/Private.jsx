
import  { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { Navigate } from 'react-router-dom'


export const Private = (props) => {
    const loggedData = useContext(UserContext)
  return (
    loggedData.loggedUser!==null?
    <props.Component/>
    :
    <Navigate to ="/login"/>
    
  )
}
