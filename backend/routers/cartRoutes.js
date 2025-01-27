const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// 1. Add Item to Cart
router.put("/add/:id", async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the item with the same productId and userId already exists in the cart
    let existingItem = await Cart.findOne({ user: userId, product: productId });
    console.log(existingItem);
    
    // If item already exists and quantity is the same, don't add it again
    if (existingItem) {
      if (existingItem.quantity === quantity) {
        console.log("same product");
        
        return res.json({ message: "Item with the same quantity already exists in the cart",items: await Cart.find({ user: userId }) });
      } else {
        // Otherwise, update the quantity of the item
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.json({ message: "Item quantity updated", items: await Cart.find({ user: userId }) });
      }
    } else {
      // If the item doesn't exist, add a new item to the cart
      const newItem = new Cart({
        user: userId,
        product: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        countInStock: product.countInStock,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
        quantity: quantity,
      });
      await newItem.save();
      return res.json({ message: "Item added to cart", items: await Cart.find({ user: userId }) });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 2. Remove Item from Cart
router.delete("/remove/:id/:productId", async (req, res) => {
  const userId = req.params.id;
  const productId = req.params.productId;

  try {
    const result = await Cart.deleteOne({ user: userId, product: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const updatedCart = await Cart.find({ user: userId });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get All Cart Items for a User
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const items = await Cart.find({ user: userId });
    console.log("cartItems:");
    console.log(items);
    
    res.json({items});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
