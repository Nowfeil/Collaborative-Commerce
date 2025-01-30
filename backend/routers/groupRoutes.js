const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // Assuming you're using JWT
const groupModel = require("../models/groupModel");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
router.delete("/removeUser",async(req,res)=>{
    const {groupId,userId} = req.body
    try {
        const group = await groupModel.findById(groupId);
        if (!group) {
          throw new Error("Group not found");
        }
        // Remove userId from the members array
        group.members.pull(userId);
        await group.save();
        res.status(200).send(group);
      } catch (error) {
        res.status(400).send(error.message);
      }
})

router.put("/updateName",async(req,res)=>{
    const {groupId,newName} = req.body
    try {
        const group = await groupModel.findByIdAndUpdate(
          groupId,
          { name: newName },
          { new: true }
        );
        if (!group) {
          throw new Error("Group not found");
        }
        res.status(200).send(group)
      } catch (error) {
        res.status(400).send(error.message);
      }
    
})

router.get("/:userId",async(req,res)=>{
    const {userId} = req.params
    try {
        const groups = await groupModel.find({ members: userId });
        if (!groups || groups.length === 0) {
          throw new Error("No groups found for the user");
        }
        res.status(200).send(groups);
      } catch (error) {
        res.status(400).send(error.message);
      }
})


router.post('/group-members', async (req, res) => {
  try {
    // Extract the first object from the request array
    const group = req.body;
    
    const a = group.memberIds[0].members
    console.log(a);
    
    const memberIds = a.map(id => new mongoose.Types.ObjectId(id));

    console.log('Extracted Member IDs:', memberIds);

    // Alternative method: Using Mongoose aggregation to fetch user details
    const members = await User.aggregate([
      {
        $match: { _id: { $in: memberIds } }
      },
      {
        $project: { name: 1, email: 1 } // Only fetch required fields
      }
    ]);

    
    res.json(members);
  } catch (error) {
    console.error('Error fetching group members:', error);
    res.status(500).json({ message: 'Error fetching group members' });
  }
});


module.exports = router