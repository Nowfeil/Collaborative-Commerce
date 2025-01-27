const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
// Create a new order for a user
router.post("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
    //   console.log(req.body);
      
      const { products } = req.body; 
      console.log("userid: "+userId+"  products:"+products.length);
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products array is required and cannot be empty." });
      }
  
      const orders = await Promise.all(
        products.map(async(p) => {
          console.log(p);
          
          const { _id,name,image,price,quantity,product } = p;
          // Validate product fields
          if (!name || !quantity || !price) {
            throw new Error("Each product must include productName, quantity, and price.");
          }
          const modifyProduct = await Product.findById(product);
          const modifiedProduct = await Product.findByIdAndUpdate(product,{
            countInStock:
            modifyProduct.countInStock - quantity
          })
          const removeItems = await Cart.deleteMany({user:userId})
          return new Order({
            name,
            image,
            price,
            quantity,
            user: userId,
          }).save();
        })
      );
      console.log(orders);
      
      // Add the order IDs to the user's orders array
      const orderIds = orders.map((order) => order._id);
      user.orders.push(...orderIds);
      await user.save();
  
      res.status(201).json({
        message: "Orders created successfully",
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Get all orders for a user
router.get("/:userId/orders", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("orders"); // Populate orders
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Delete an order
router.delete("/:userId/orders/:orderId", async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderIndex = user.orders.indexOf(orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found in user orders" });
    }

    user.orders.splice(orderIndex, 1);
    await user.save();

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
