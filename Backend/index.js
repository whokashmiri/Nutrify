const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require('./Models/userSchema')
// const cors = require('cors')

mongoose.connect("mongodb://localhost:27017/nutri")
.then(()=>{
    console.log("Database Connected Successfully");  
}).catch((err)=>{
    console.log("Problem in Connecting to the Database", err);
    
})

const app = express();
app.use(express.json())

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



app.post("/login" , async (req,res)=>{
    
    let userCred = req.body;
    try {
        const user = await userModel.findOne({email:userCred.email});
        console.log(user);
        
        if (user!==null) {
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
               
                
                if(success==true){
                    console.log(res);
                    
                    res.status(200).send({message:"Login Successful"})

                }else{
                    res.status(404).status({message:"User Not Found"})
                }
                console.log(err);
                res.send({message:"In correct Password"})

            })
               
        } else {
            res.status(404).send({message:"User Not Found"})
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Some Problem"})
        
        
    }

})




app.listen(8000,()=>{
    console.log("Server is Up And Running");
    
})