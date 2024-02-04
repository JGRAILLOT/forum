// controllers/voteController.js
const Vote = require("../models/vote");

class VoteController {
  async addVote(postId, userId, value) {
    try {
      const newVote = new Vote({ postId, userId, value });
      await newVote.save();
      console.log(`Vote added successfully`);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async deleteVote(postId, userId) {
    try {
      const result = await Vote.deleteOne({ postId, userId });
      if (result.deletedCount > 0) {
        console.log("Vote deleted successfully");
      } else {
        console.error("Vote not found");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getVotes(postId) {
    try {
      const votes = await Vote.find({ postId });
      return votes;
    } catch (error) {
      throw new Error("Error fetching votes: " + error.message);
    }
  }

  async getExistingVote(postId, userId) {
    try {
      const existingVote = await Vote.findOne({ postId, userId });
      return existingVote || null; // Return null if no existing vote is found
    } catch (error) {
      throw new Error("Error fetching existing vote: " + error.message);
    }
  }

  async getVoteCount(postId) {
    try {
      const votes = await this.getVotes(postId);
      const upvotes = votes.filter((vote) => vote.value === 1);
      const downvotes = votes.filter((vote) => vote.value === 2);
      const voteCount = upvotes.length - downvotes.length;
      return voteCount;
    } catch (error) {
      throw new Error("Error calculating vote count: " + error.message);
    }
  }
}

module.exports = new VoteController();
