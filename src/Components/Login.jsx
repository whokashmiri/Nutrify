

export const Login = () => {
  return (
    <section className='h-screen w-screen bg-slate-600 flex items-center justify-center' >
    <form  className=" w-5/12 gap-6 flex flex-col items-start">
        <h1 className="font-extrabold text-2xl font-serif ml-36 text-cyan-50 " >Lets Get Fit</h1>
    
        <input className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="email" placeholder="Enter Your Email" name = 'name' />

         <input   className="w-full h-10 indent-8 rounded-md outline-0 border-gray-500"  type="password" placeholder="Enter Your Password" name = 'password' />
      
        <button className="px-9 py-3 bg-blue-400 flex items-start rounded-xl cursor-pointer font-bold  hover:bg-sky-700 hover:text-cyan-50">LOGIN</button>

        <p className="font-bold pb-9 text-cyan-50">Not Registered? Register</p>
    </form>

</section>   
  )
}
