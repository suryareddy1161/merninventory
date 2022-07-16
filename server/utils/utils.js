const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const { connections } = require("mongoose");
const key="Secretkey"

const passwordCompare=async(dbPassword,enteredPassword)=>{


    try{

      return  await bcrypt.compare(enteredPassword, dbPassword)

    }

    catch(error){
       
        return false

    }

   
}

const jwtGen=async(userData)=>{

    try{

        const token = await jwt.sign(userData , key );
        return token
    }

    catch(error){

        return false
    }

   

}

module.exports={
    passwordCompare,
    jwtGen

}