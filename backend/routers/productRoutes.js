const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const {
      _id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      rating,
      numReviews,
    } = req.body;
    if (_id) {
      // If `_id` is provided, check if the product exists and update it
      const existingProduct = await Product.findById(_id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
        existingProduct.image = image;
        existingProduct.brand = brand;
        existingProduct.category = category;
        existingProduct.countInStock = countInStock;
        existingProduct.description = description;
        existingProduct.rating = rating;
        existingProduct.numReviews = numReviews;

        const updatedProduct = await existingProduct.save();
        return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
      } else {
        return res.status(404).send({ message: 'Product Not Found' });
      }
    } else {
      const product = new Product({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating,
        numReviews,
      });

      const newProduct = await product.save();
      res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
  } catch (error) {
    res.status(400).send({ message: 'Error in saving the product', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching the product', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    
    const product = await Product.findById(req.params.id);
    if (product) {
      const delet = await Product.findByIdAndDelete(req.params.id)
      res.status(200).send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching the product', error: error.message });
  }
});
module.exports = router;
