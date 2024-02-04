// controllers/PostController.js
const Post = require("../models/post");

class PostController {
  async createPost(title, content, picture = null, authorId) {
    try {
      const createdAt = new Date().toISOString();
      const newPost = new Post({
        title,
        content,
        picture,
        authorId,
        createdAt,
      });
      const savedPost = await newPost.save();
      return savedPost._id;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getLastPost(req, res) {
    try {
      const lastPost = await Post.findOne().sort({ createdAt: -1 }).exec();

      if (!lastPost) {
        return res.status(404).json({ error: "No posts found" });
      }

      return res.status(200).json(lastPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deletePost(postId) {
    try {
      const result = await Post.deleteOne({ _id: postId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async updatePost(postId, title, content, authorId, picture) {
    try {
      if (picture) {
        await Post.findByIdAndUpdate(postId, {
          title,
          content,
          authorId,
          picture,
        });
      } else {
        await Post.findByIdAndUpdate(postId, { title, content, authorId });
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      return await Post.findById(postId);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

module.exports = new PostController();
