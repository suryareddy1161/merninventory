const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String },
  qty: { type: Number },
  price: { type: Number },
  catagory: { type: String },
  company: { type: String },
  Date: { type: Date, default: Date.now },
});

const stockModel = mongoose.model("inventory", stockSchema);

module.exports = stockModel;
