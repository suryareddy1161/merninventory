const jwt=require("jsonwebtoken")
const key="Secretkey"
const allowAccess=(req,res,next)=>{

 
   const token=req.headers.token;
    console.log(token,"ttttttttt")

   if(token){

    jwt.verify(token, key, function(err, decoded) {

        if(err){
            console.log("Invalid token") 
        }

        else{
            next();

        }
         
      });
     
    
     
   }

   else{

    res.json({
        message:"Restricted access"
    })
   }

}

module.exports={allowAccess}