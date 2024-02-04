// routes/voteRoutes.js
const express = require("express");
const voteController = require("../controllers/voteController");

const voteRouter = express.Router();

// Add a new vote or update an existing vote
voteRouter.post("/votes", async (req, res) => {
  const { postId, userId, value } = req.body;

  try {
    await voteController.addVote(postId, userId, value);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a vote
voteRouter.delete("/votes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  try {
    if (postId && userId) {
      await voteController.deleteVote(postId, userId);
    } else {
      res.status(400).send("Invalid request parameters");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get vote count for a post
voteRouter.get("/votes/count/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    if (postId) {
      const voteCount = await voteController.getVoteCount(postId);
      res.status(200).json({ voteCount });
    } else {
      res.status(400).send("Invalid request parameters");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

voteRouter.get("/votes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  try {
    if (postId && userId) {
      const existingVote = await voteController.getExistingVote(postId, userId);
      res.status(200).json({ existingVote });
    } else {
      res.status(400).send("Invalid request parameters");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = voteRouter;
