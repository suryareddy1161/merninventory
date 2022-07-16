const express=require("express")
const userrouter=express.Router();

const{getUSerdata}=require("../controllers/user.controller")



const {allowAccess}=require("../middlewares/security.middleware")
// userrouter.use(allowAccess)

// userrouter.get("/showuser",getUSerdata)


module.exports=userrouter