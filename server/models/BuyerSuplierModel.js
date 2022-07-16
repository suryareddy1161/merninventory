const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  CompName: { type: String, required: true, trim: true },
  BusType: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  Contact: { type: String, required: true, trim: true },
});

const buyerModel = mongoose.model("Buyer-Supplier", buyerSchema);

module.exports = buyerModel;
