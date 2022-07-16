const express=require("express")
const adminrouter=express.Router();
const{getUSerdata1}=require("../controllers/user.controller")

const {allowAccess}=require("../middlewares/security.middleware")
// adminrouter.use(allowAccess)

adminrouter.get("/showadmin",getUSerdata1)


module.exports=adminrouter