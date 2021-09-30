const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  price:Number,

}, {timestamps: true});
module.exports = mongoose.model("Cart", CartSchema);
