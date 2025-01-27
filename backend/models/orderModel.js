const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    category: {type:Boolean,required:true,default:false},
    qty: {type:Number,required:true,default:0},
    orderDate: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
