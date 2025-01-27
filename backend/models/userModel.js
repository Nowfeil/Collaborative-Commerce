const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], 
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }], 
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
