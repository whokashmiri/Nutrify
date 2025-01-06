/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import React, { useState , useContext} from 'react';
import { UserContext } from "./context/UserContext";



export const Login = () => {

  const [userCred , setUserCred] = useState({
    email:"",
    password:""
  })
  const [message, setMessage]= useState({
    type:"",
    text:""
  })
  
const loggedInData = useContext(UserContext);


  const navigate = useNavigate();

  function handleInput(event) {
    setUserCred((prev)=>{
      return {...prev,[event.target.name]:event.target.value}
    })
    
  }


  function handleSubmit(event) {
    event.preventDefault;
    console.log(userCred);
    fetch("http://localhost:8000/login",{
      method:"POST",
      body:JSON.stringify(userCred),
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      console.log(res);
      if(res.status===404){
        setMessage({type:"error" , text:"User Not Found"})
      }
      else if(res.status===403){
        setMessage({type:"error", text:"Incorrect Password"})
       

      }
      else if(res.status===200){
        return res.json()
      }

      setTimeout(() => {
        setMessage({type:"",text:""})
      }, 3000);
    
    })
    .then((data)=>{
      console.log(data);

      if(data.token!==undefined){
        localStorage.setItem("user",JSON.stringify(data));
        loggedInData.setLoggedUser(data)
        navigate("/track");
      }else{
        navigate("/login")
      }
     
      
    }).catch((err)=>{
      console.log(err);
      
    })
    
    
  }
  return (
    <section className="bg-[url('https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center h-screen flex items-center justify-center">
    <form  className=" w-5/12 gap-6 flex flex-col items-start" onChange={handleInput}>
        <h1 className="font-extrabold text-2xl font-serif text-cyan-50 " >Lets Get Fit</h1>
    
        <input className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500" required type="email" placeholder="Enter Your Email" name = 'email' value={userCred.email} onChange={handleInput}/>

         <input   className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="password" required min={6} placeholder="Enter Your Password" value={userCred.password} name = 'password' onChange={handleInput} />
      
        <button type="button" className="px-9 py-3 bg-blue-400 flex items-start rounded-xl cursor-pointer font-bold  hover:bg-sky-700 hover:text-cyan-50" onClick={handleSubmit}>LOGIN</button>

        <p className="font-bold pb-9 text-cyan-50">Not Registered?  <Link to="/register">Register</Link> </p>
        <p className={message.type === 'success' ? 'text-green-600' : 'text-red-500'}>{message.text}</p>
    </form>

</section>   
  )
}
