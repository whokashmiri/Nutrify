import  { useContext } from 'react'
import { UserContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const loggedData = useContext(UserContext);
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem("user")
        loggedData.setLoggedUser(null)
        navigate("/login")
    }
  return (
    <>
        <ul className='flex  justify-evenly'>
            <li className='text-3xl text-white' >Home</li>
            <li className='text-3xl text-white'  onClick={logout}>Logout</li>
        </ul>
    </>
  )
}

export default Header