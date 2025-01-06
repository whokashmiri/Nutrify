const jwt = require("jsonwebtoken")
function RouteProtection(req,res,next){
    if(req.headers.authorization!==undefined){
     let token = req.headers.authorization.split(" ")[1];
     jwt.verify(token,"SECRET",(err,data)=>{
        if (!err) {
            next()
            console.log(data);
            
            
        } else {
            console.log(err);           
            res.status(403).send({message:"Invalid Token"})
            
        }
     })

    }else{
        res.status(500).send({message:"Please Send Token"})
    }

}

module.exports=RouteProtection;