const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  custName: { type: String },
  name: { type: String },
  email: { type: String },
  qty: { type: Number },
  price: { type: Number },
  totalPrice: { type: Number },
  company: { type: String },
  Date: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("ttorder", orderSchema);

module.exports = orderModel;
