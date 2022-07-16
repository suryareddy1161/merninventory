const orderModel = require("../models/OrderModel");
const inventryModel = require("../models/inventryModel");

class InventryController {
  static getData = async (req, res) => {
    try {
      const List = await orderModel.find();
      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };

  static create = async (req, res) => {
    console.log(req.body);
    try {
      console.log(req.body);

      let newData = new orderModel({
        custName: req.body.custName,
        name: req.body.order.name,
        email: req.body.email,
        qty: req.body.orderQty,
        price: req.body.order.price,
        totalPrice: req.body.total,
        company: req.body.order.company,
        //Date: req.body.Date,
      });
      let result = await newData.save();
      console.log("data in result", result);
      res.send("data saved sucessfully");
      // deduct stocks from inventryModel
      let newQty = parseInt(req.body.order.qty - req.body.orderQty);
      let result1 = await inventryModel.updateOne(
        { _id: req.body.order._id },
        {
          $set: {
            qty: newQty,
          },
        }
      );
      //res.send(result1);
    } catch (err) {
      console.log(err);
    }
  };

  static findOrderByEmail = async (req, res) => {
    console.log(req.query.email);
    try {
      const List = await orderModel.find({ email:req.query.email});
      // const List = await orderModel.find({});

      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };


  static deleteOrder = async (req, res) => {
    console.log(req.query.id);
    try {
      const List = await orderModel.deleteOne({_id:req.query.id });
      // const List = await orderModel.find({});

      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };



  // console.log(req.params.id);
  //   try {
  //     let result = await inventryModel.findOne({ _id: req.params.id });
  //     // console.log(result);
  //     res.send(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
}
module.exports = InventryController;
