const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
