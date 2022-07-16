// const buyerModel = require("../models/BuyerSupplierModel");
const buyerModel = require("../models/BuyerSuplierModel");
class BuyerController {
  static getData = async (req, res) => {
    try {
      const List = await buyerModel.find();
      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };

  static create = async (req, res) => {
    try {
      console.log(req.body);
      let newData = new buyerModel(req.body);
      let result = await newData.save();
      console.log("data in result", result);
      res.send("data saved sucessfully");
    } catch (err) {
      res.send(err);
    }
  };

  static getCompany = async (req, res) => {
    try {
      const companyName = await buyerModel.find();
      console.log("Company", companyName);
      res.send(companyName);
    } catch (err) {
      console.log(err);
    }
  };

  //delete data
  static delete = async (req, res) => {
    try {
      let newData = await buyerModel.deleteOne({ _id: req.params.id });
      res.send(newData);
      // res.send("Data deleted");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BuyerController;