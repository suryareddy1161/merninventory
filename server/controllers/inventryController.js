const inventryModel = require("../models/inventryModel");

class InventryController {
  static getData = async (req, res) => {
    try {
      const List = await inventryModel.find();
      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };

  static create = async (req, res) => {
    try {
      console.log(req.body);
      let newData = new inventryModel(req.body);
      let result = await newData.save();
      console.log("data in result", result);
      res.send("data saved sucessfully");
    } catch (err) {
      res.send(err);
    }
  };

  // edit data
  static edit = async (req, res) => {
    console.log(req.params.id);
    try {
      let result = await inventryModel.findOne({ _id: req.params.id });
      // console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };

  //update data
  static update = async (req, res) => {
    try {
      let result = await inventryModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            catagory: req.body.catagory,
            company: req.body.company,
            Date: req.body.Date,
          },
        }
      );
      // console.log(result);
      res.send(result);
      //res.send("data updated");
    } catch (err) {
      console.log(err);
    }
  };

  //delete data
  static delete = async (req, res) => {
    try {
      let newData = await inventryModel.deleteOne({ _id: req.params.id });
      res.send(newData);
      // res.send("Data deleted");
    } catch (err) {
      console.log(err);
    }
  };

  //serach data
  static search = async (req, res) => {
    try {
      let newData = await inventryModel.find({
        $or: [
          { name: { $regex: req.params.key } },
          { catagory: { $regex: req.params.key } },
          { company: { $regex: req.params.key } },
        ],
      });
      //console.log(newData);
      res.send(newData);
    } catch (err) {
      console.log(err);
    }
  };

  // sorting
  static sortByName = async (req, res) => {
    try {
      let sortedData = await inventryModel
        .find({})
        .sort({ name: parseInt(req.query.num) });
      res.send(sortedData);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = InventryController;
