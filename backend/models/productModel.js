const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    category: {type:Boolean,required:true,default:false},
    brand: {type:Boolean,required:true,default:false},
    countInStock: {type:Number,required:true,default:0},
    description: {type:String,required:true,default:''},
    rating: {type:Number,required:true,default:0},
    numReviews: {type:Number,required:true,default:0}
})


const productModel = mongoose.model("product",productSchema)
module.exports = productModel