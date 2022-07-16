const bcrypt = require('bcrypt');

const encryptPassword=async(req,res,next)=>{
    
    try{

        const hash=await bcrypt.hash(req.body.password, 10);
         
        req.body.password=hash
        console.log(req.body.password)
        next();

    }catch(error){
       console.log(error)
        res.json({
            message:"Error in encrypting the password"
        })


    }

   



}

module.exports={
    encryptPassword

}