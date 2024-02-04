// models/vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true }, // 1 for upvote, 2 for downvote
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
