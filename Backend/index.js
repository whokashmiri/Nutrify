const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require('cors')

const userModel = require('./Models/userModel')
const foodModel = require('./Models/foodModel')
const trackingModel = require("./Models/trackingModel")
const RouteProtection  = require("./Middleware/ProtectRoute")

mongoose.connect("mongodb://localhost:27017/nutri")
.then(()=>{
    console.log("Database Connected Successfully");  
}).catch((err)=>{
    console.log("Problem in Connecting to the Database", err);
    
})

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", (req,res)=>{
    let user = req.body;
    bcrypt.genSalt(10, (err, salt)=>{

        if (!err) {
            console.log("Salt Generated");
            
            bcrypt.hash(user.password , salt , async(err,hPass)=>{
                if(!err){
                    console.log("Password hashed");                   
                    user.password= hPass
                    try {
                        
                        let doc = await userModel.create(user)
                        console.log(doc);
                        res.status(200).send({message:"User Created"})
                        
                    } catch (error) {
                        console.log(error);
                        res.status(500).send({message:"Error in Creating User"})
                        
                    }

                }else(error)=>{
                    console.log(error);
                    res.status(500).send({message:"Error in Hashing Password"})

                }
            })
        } else (err)=>{
            console.log(err);
            res.send({message:"Error in Generating Salt"})
            
        }
        
    })
})

app.post("/login",async(req,res)=>{
    let userCred = req.body;
    try {
        let user = await userModel.findOne({email:userCred.email});
        if (user!==null) {
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
                if (success) {
                    jwt.sign({email:userCred.email},"SECRET",(err,token)=>{
                        if (!err) {
                            res.send({
                                message:"Login Success",
                                token:token,
                                userid:user._id,
                                 name:user.name                            })                    
                        } else {
                            res.status(500).send({message:"Error in generating Token"})
                        }
                    })    
                } 
                else{
                    res.status(403).send({message:"Incorrect Password"})
                }
            })      
        } else {
            res.status(404).send({message:"User Not Found"})
        }     
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Some Problem"})
   
    }
})

app.get("/foods",RouteProtection,async(req,res)=>{
    try {
        let foods = await foodModel.find();
        res.send(foods)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Some Problem "})
        
    }
   
})

app.get("/foods/:name", RouteProtection,async(req,res)=>{
  try {
    let foods = await foodModel.find({name:{$regex:req.params.name,$options:'i'}})
   if (foods.length!==0) {
    res.send(foods);
    
   } else {
    res.status(404).send({message:"Food Not Found"})
   }
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"Some Problem"})
    
  }

})

app.post("/track",RouteProtection, async(req,res)=>{
    let trackData = req.body;
    try {
        let data = await trackingModel.create(trackData)
        console.log(data);
        
        res.status(201).send({message:"Food Added"})
    } catch (error) {
        console.log( " IN Foods",error);
        res.status(500).send({message:"IN Food Some Problem"})
        
        
    }


})

app.get("/track/:userid/:date",RouteProtection,async(req,res)=>{
    console.log("Request");
    let userId = req.params.userid;
    let date = new Date(req.params.date);
    let strDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    console.log(strDate, date);

    try {
        let foods = await trackingModel.find({ userId: userId, eatenDate: strDate }).populate("userId").populate("foodId");
        res.send(foods);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Problem" });
    }
});

        
 




app.listen(8000,()=>{
    console.log("Server is Up And Running");
    
})