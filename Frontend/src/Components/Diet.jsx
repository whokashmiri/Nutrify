/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import { UserContext } from "./context/UserContext"
import { useContext } from "react"
import Header from './Header'


const Diet = () => {
    const loggedData = useContext(UserContext)
    const [items ,setItems] = useState([])
    const [date, setDate] = useState(new Date)
    let [total,setTotal] = useState({
        totalCalories:0,
        totalCarbohydrates:0,
        totalProtein:0,
        totalFat:0,
        totalFiber:0

    })
    useEffect(()=>{
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        }).then((res)=>res.json())
        .then((data)=>{
            
                setItems(data)
                console.log(data);

            
            
           
           
            
        }).catch((err)=>{
            console.log(err);
            
        })

    },[date])
    useEffect(()=>{
        CalTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[items])
    function CalTotal(){
        let totalCopy={
            totalCalories:0,
            totalCarbohydrates:0,
            totalProtein:0,
            totalFat:0,
            totalFiber:0
        };
        items.forEach((item)=>{
        totalCopy.totalCalories +=item.details.calories
        totalCopy.totalCarbohydrates +=item.details.carbohydrates
        totalCopy.totalProtein +=item.details.protein
        totalCopy.totalFat +=item.details.fat
        totalCopy.totalFiber +=item.details.fiber

    })
    setTotal(totalCopy);
    
}
   

  return (
    <>
     <section className="bg-custom-radial bg-cover bg-center h-screen flex flex-col items-center justify-center">
     <Header/>
     <h1 className="text-3xl text-white">Welcome, {loggedData.loggedUser.name}</h1>
     <input className="p-2 rounded-lg" type="date" name="" id="" onChange={(event)=>{
        setDate(new Date(event.target.value))
     }}/>


     
     {
        items.map((item)=>{
            return(
                <div className="w-screen p-3 flex flex-row " key={item._id}>
                     <img className="w-48 rounded-lg" src={item.foodId.imageUrl} alt="" />
                
                   <div className="flex flex-col text-white ">
                   <h1 className="text-3xl pl-2">Name: {item.foodId.name} Calories: {item.foodId.calories}Kcal for {item.quantity} G</h1>
                   <p className="text-xl pl-2">Protein: {item.details.protein} G</p>
                   <p className="text-xl pl-2">Carbs: {item.details.carbohydrates} G</p>
                    <p className="text-xl pl-2">Fat: {item.details.fat} G</p>
                    <p className="text-xl pl-2">Fiber {item.details.fiber} G</p>
                   </div>

                   
                   
                    
                </div>
            )
        })
     }
     <div className="text-3xl text-blue-100">

        <h3>  {total.totalCalories} Kcal </h3>

            <p>Protein {total.totalProtein}g, Carbs {total.totalCarbohydrates}g, Fats {total.totalFat}g, Fiber {total.totalFiber}g</p>

    </div>
     </section>
     </>
  )
}

export default Diet