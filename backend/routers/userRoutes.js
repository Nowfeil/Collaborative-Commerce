const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // Assuming you're using JWT
const Group = require("../models/groupModel");
const nodemailer = require("nodemailer");

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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com", 
      port: 587,
      secure: false, 
      auth: {
        user: "anowfeil@gmail.com", // Replace with your Gmail address
        pass: "zkli vnmk hcfb rekf", // Replace with your generated app password
      },
    });

    try {
      // Send email
      const info = await transporter.sendMail({
        from: '"SALAAR DEVARATHA RAISAAR" <anowfeil@gmail.com>', // Sender address
        to: email, // Receiver's email address
        subject: "Welcome to CollabCommerce!!!!", // Subject line
        text: "Khansaar Erupekkaala!!!", // Plain text body
      });

      console.log("Message sent: %s", info.messageId);
      res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: false,
        token: getToken(createdUser), // Generate token for authentication
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send({msg:"Failed to send email."});
    }
    
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
  
  router.get("/allUsers",async(req,res)=>{
    try{
      const users = await User.find({});
      res.status(200).send(users)
    }catch(err){
      res.status(400).send({msg:"Error in requesting Users"})
    }
  })


  router.post("/sendInvite", async (req, res) => {
    const { inviterEmail, inviteeEmail } = req.body;
  
    const inviter = await User.findOne({ email: inviterEmail });
    const invitee = await User.findOne({ email: inviteeEmail });
  
    if (!inviter || !invitee) {
      return res.status(404).send({ msg: "User not found" });
    }
  
    let group;
  
    if (inviter.group) {
      // If inviter is already in a group, add invitee to the same group
      group = await Group.findById(inviter.group);
      if (!group.members.includes(invitee._id)) {
        group.members.push(invitee._id);
      }
    } else {
      // If inviter is not in any group, create a new group with both users
      group = new Group({
        members: [inviter._id, invitee._id],
      });
  
      // Assign group to inviter
      inviter.group = group._id;
    }
  
    // Assign group to invitee
    invitee.group = group._id;
  
    await group.save();
    await inviter.save();
    await invitee.save();
  
    // Send invitation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anowfeil@gmail.com",
        pass: "zkli vnmk hcfb rekf",
      },
    });
  
    try {
      await transporter.sendMail({
        from: '"SALAAR DEVARATHA RAISAAR" <anowfeil@gmail.com>',
        to: inviteeEmail,
        subject: "You have been invited to a group!",
        html: `<p>You have been added to a group.</p>
               <p>Click <a href="http://yourdomain.com/group/${group._id}">here</a> to view your group.</p>`,
      });
  
      res.status(200).send({ msg: "Invite sent successfully!", group });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send({ msg: "Failed to send email." });
    }
  });
    
  

module.exports = router;
