import Header from "./Header"
import { useContext, useState } from "react"
import { UserContext } from "./context/UserContext"
import Food from "./Food"

const Track = () => {
const  loggedData = useContext(UserContext)

const [foodItems, setFoodItems]= useState([])
const [food, setFood] = useState(null)

console.log(loggedData.loggedUser.name);
const name = loggedData.loggedUser.name

 

  function searchFood(event){
    if(event.target.value.length!==0){
      console.log(event.target.value);
    fetch(`http://localhost:8000/foods/${event.target.value}`,{
      method:"GET",
      "Content-Type":"application/json",
      headers:{
        "Authorization":"Bearer "+ loggedData.loggedUser.token

      }
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      if (data.message===undefined) {
        setFoodItems(data)
      } else {
        setFoodItems([])
        
      }
      
      
    }).catch((error)=>{
      console.log(error);
      
    })
    }
    else{
      setFoodItems([])
    }
    
  }


  
  return (
    <div>
       <section className="bg-custom-radial bg-cover bg-center h-screen ">
       <Header/>


       <h1 className="text-xl ml-3 font-sans font-extrabold"> Welcome <span className="font-extrabold text-3xl  text-white">{name}</span></h1>
       <div className="w-screen  ">
        <input onChange={searchFood} type="search" placeholder="Search Food" className="w-4/5 h-11 outline-blue-400 indent-2 rounded-xl "/>
        {
          foodItems.length!==0?(
            <div className="w-screen px-4 mt-2 bg-yellow-100 absolute ">
          {
            foodItems.map((item)=>{
              return(
                <p className="text-yellow-500 text-2xl"
                key={item._id}
              onClick={()=>{
                setFood(item)
  
                
              }}
                >{item.name}</p>
              )
            })
          }
        </div>
        ):null
        }


         {
          food!==null?(
            <Food food={food}/>
          ):null
        }
       </div>
       



     
       </section>

       
     
    </div>
  )
}

export default Track