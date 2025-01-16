const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // Assuming you're using JWT

// Replace with your secret key
const JWT_SECRET = "your_jwt_secret_key";

// Helper function to generate JWT token
const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: '48h' } // Token expiration
    );
};

// Route to create admin user
router.get('/createAdmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Adnan',
            email: 'adnan@gmail.com',
            password: await bcrypt.hash('1234', 10), 
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (err) {
        res.status(404).send({ msg: err.message });
    }
});

// Route for user sign-in
router.post('/signin', async (req, res) => {
    console.log('Received request body:', req.body); 

    const signinUser = await User.findOne({ email: req.body.email });

    if (!signinUser) {
        console.log('User not found for email:', req.body.email);
    }
    
    if (signinUser && (await bcrypt.compare(req.body.password, signinUser.password))) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({ msg: 'Invalid Credentials' });
    }
});


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name+" : "+email+" : "+password);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: 'User already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
  
    const createdUser = await user.save();
  
    res.send({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: false,
      token: getToken(createdUser), // Generate token for authentication
    });
  });
  
  router.put('/profile', async (req, res) => {
    const { id, name,email, password } = req.body.id; // Destructure required fields from the request body
    console.log(id+": "+name+" : "+email );

    try {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
      }
  
      const user = await User.findByIdAndUpdate(
        id, 
        updateFields, 
        { new: true } 
      );
  
      if (!user) {
        return res.status(404).send({ msg: 'User not found' });
      }
  
      res.send(user);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  });
  

module.exports = router;
