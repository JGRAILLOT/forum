// controllers/searchController.js
const Post = require("../models/post");
const User = require("../models/user");

const searchController = {
  searchAuthor: async (req, res) => {
    const { query } = req.body;

    try {
      const author = await User.findOne({ username: query });
      const results = await Post.find({
        authorId: author._id,
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  searchTitle: async (req, res) => {
    const { query } = req.body;

    try {
      const results = await Post.find({
        title: { $regex: query, $options: "i" },
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  searchContent: async (req, res) => {
    const { query } = req.body;

    try {
      const results = await Post.find({
        content: { $regex: query, $options: "i" },
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = searchController;
