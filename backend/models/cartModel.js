const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true }, // Changed from Boolean
    brand: { type: String, required: true }, // Changed from Boolean
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true, default: '' },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1 }, // Added this field
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Added the `ref` to link with the Product model
        required: true
    },
    lastRequestTime: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
