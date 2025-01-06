/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "./context/UserContext"



const Food = (props) => {
  const [eatenQuantity,setEatenQuantity] = useState(100);
    const [food , setFood] = useState({})
    const [foodInitial,setFoodInitial] = useState({});
    let loggedData = useContext(UserContext)
    
    useEffect(()=>{
        setFood(props.food)
        setFoodInitial(props.food);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.food])

    function calMac(event){
      if(event.target.value.length!==0){
        let quantity = Number(event.target.value)
        setEatenQuantity(quantity);
        let copyFood = {...food}
          copyFood.protein = (foodInitial.protein*quantity)/100;
          copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
          copyFood.fat = (foodInitial.fat*quantity)/100;
          copyFood.fiber = (foodInitial.fiber*quantity)/100;
          copyFood.calories = (foodInitial.calories*quantity)/100;

          setFood(copyFood);

        
      }
    }



    function trackFoodItem(){

      let trackItem={
        userId:loggedData.loggedUser.userid,
        foodId:food._id,
        details:{
          protein:food.protein,
          carbohydrates:food.carbohydrates,
          calories:food.calories,
          fat:food.fat,
          fiber:food.fiber
        },
        quantity:eatenQuantity
      
        

      }
      console.log(trackItem);
     


      fetch("http://localhost:8000/track",{
        method:"POST",
        body:JSON.stringify(trackItem),
        
        headers:{
          "Authorization":`Bearer ${loggedData.loggedUser.token}`,
          "Content-Type":"application/json",
        }
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        
      }).catch((err)=>{
        console.log(err);
        
      })

      
    }
  return (
    <div>
         <div className="w-screen p-3  mt-7 flex"> 
        <div className="w-screen h-auto">
          
          <img className="h-auto bg-cover overflow-hidden rounded-2xl" src={food.imageUrl} alt="" />
         </div>
         <div className="w-screen h-auto flex flex-wrap">
          <h1 className="w-3/4 text-2xl h-32 indent-1 text-white"> {food.name} {food.calories } Kcal from {eatenQuantity} G</h1>
          <div className="w-2/4 pt-2 text-yellow-50  text-xl h-32">
            <p className="text-2xl indent-2">Protein</p>
            <p className="indent-2">{food.protein}g</p>
            
          </div>
          <div className="w-2/4 pt-2 text-yellow-50  text-xl h-32">
            <p className="text-2xl indent-2">Fat</p>
            <p className="indent-2">{food.fat}g</p>
            
          </div>
          <div className="w-2/4 pt-2 text-yellow-50 text-xl h-32">
            <p className="text-2xl indent-2">Carbohydrates</p>
            <p className="indent-2">{food.carbohydrates}g</p>
            
          </div>
          <div className="w-2/4 pt-2 text-yellow-50 text-xl h-32">
            <p className="text-2xl indent-2">Fiber</p>
            <p className="indent-2">{food.fiber}g</p>
             
          </div>
          <input type="number" placeholder="Quantity In Grams" className=" ml-2 w-4/12 h-11 outline-blue-400 indent-2 rounded-xl" onChange={(calMac)}/>
          <button onClick={trackFoodItem} type="button" className="px-9 py-3 bg-blue-400 flex items-start rounded-xl cursor-pointer font-bold ml-2  hover:bg-sky-700 hover:text-cyan-50" >TRACK</button>
          

        </div>
       </div>

    </div>
  )
}

export default Food