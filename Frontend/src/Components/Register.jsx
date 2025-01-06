/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import React, { useState } from 'react';



export const Register = () => {

  const [userDetails , setUserDetails] = useState({
    name:"", email:"", password:"", age:""
})

const [message, setMessage]= useState({
  type:"",
  text:""
})

function handleInput(event){
  setUserDetails((prev)=>{
    return{...prev,[event.target.name]:event.target.value}
  })
}

function handleSubmit(event) {
  event.preventDefault;
  console.log(userDetails);
  
  fetch("http://localhost:8000/register",{
    method:"POST",
    body:JSON.stringify(userDetails),
    headers:{
      "Content-Type":"application/json"
    }
  }).then((response)=>response.json())
  
  .then((data)=>{
    setMessage({type:"success", text:data.message})
    setUserDetails({
      name:"",
      email:"",
      password:"",
      age:""
    })
    setTimeout(() => {
      setMessage({type:"", text:""})
      
    }, 3000);
    console.log(data); 
  })
  .catch((error)=>{
    console.log(error);
    
  })
  

}
  return (
<section className="bg-[url('https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center h-screen flex items-center justify-center" >
    <form  className=" w-5/12 gap-6 flex flex-col items-start">

        <h1 className="font-extrabold text-2xl font-serif text-white " >Lets Get Fit</h1>
        <input className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="text" placeholder="Enter Your Name" required name = 'name' value={userDetails.name} onChange={handleInput}/>

        <input className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="email" placeholder="Enter Your Email"  required name = 'email' onChange={handleInput} value={userDetails.email}  />

         <input className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="password" placeholder="Enter Your Password" required name = 'password' value={userDetails.password}  onChange={handleInput}/>

        <input  className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="number" placeholder="Enter Your Age" required min={5} max={99} name = 'age' value={userDetails.age}  onChange={handleInput} />

        <button type="button" onClick={handleSubmit} className="px-9 py-3 bg-blue-400 flex items-start rounded-xl cursor-pointer font-bold  hover:bg-sky-700 hover:text-cyan-50">REGISTER</button>

        <p className="font-bold pb-9 text-cyan-50">Already Registered? <Link to="/login">Login</Link> </p>
        <p className={message.type === 'success' ? 'text-green-600' : 'text-red-500'}>{message.text}</p>
    </form>

</section>   
  )    
    
}
