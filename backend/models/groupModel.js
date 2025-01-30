const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Members of the group
  createdAt: { type: Date, default: Date.now },
});

const groupModel = mongoose.model("Group", groupSchema);
module.exports = groupModel;
