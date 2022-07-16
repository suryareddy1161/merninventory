const express = require("express");
const sendEmail=require("../controllers/email")
const inventryController = require("../controllers/inventryController");
const orderController = require("../controllers/orderController");
const BuyerController = require("../controllers/Buyer");
const router = express.Router();

//routes for inventry

router.get("/", inventryController.getData);
//http://localhost:8080 ==> get

router.post("/", inventryController.create);
//http://localhost:8080  ==> post

router.get("/edit/:id", inventryController.edit);
//http://localhost:8080/edit/62bee4f925aa03ecac761e07 ==> get

router.put("/edit/:id", inventryController.update);
//http://localhost:8080/edit/62bee4f925aa03ecac761e07 ==> put

router.delete("/delete/:id", inventryController.delete);
//http://localhost:8080/delete/62bee4f925aa03ecac761e07 ==> delete

router.get("/search/:key", inventryController.search);
//http://localhost:8080/search/T ==> get

router.get("/sort", inventryController.sortByName);
//http://localhost:8080/sort/ ==> get

//routes for order

router.get("/order", orderController.getData);
//http://localhost:8080/order/ ==> get

router.post("/order", orderController.create);
//http://localhost:8080/order/ ==> post

router.get("/userOrder", orderController.findOrderByEmail);

router.delete("/userOrder/delete", orderController.deleteOrder);
//http://localhost:8080/userOrder/62bee4f925aa03ecac761e07 ==> get

//routers for buyer/supllier

router.get("/company", BuyerController.getData);
//http://localhost:8080/company ==> get

router.post("/company", BuyerController.create);
//http://localhost:8080/company  ==> post

router.delete("/company/delete/:id", BuyerController.delete);
//http://localhost:8080/company/delete/62bee4f925aa03ecac761e07 ==> delete

router.get("/companyName", BuyerController.getCompany);
//http://localhost:8080/company ==> get
router.get("/user/email",(req,res)=>{
    console.log(req.query)
     sendEmail(req.query.email,req.query.data)
     res.send( "done" );
})

module.exports = router;