// controllers/CommentController.js
const Comment = require("../models/comment");
const User = require("../models/user");

class CommentController {
  async insertComment(content, authorId, postId) {
    try {
      const newComment = new Comment({ content, authorId, postId });
      const savedComment = await newComment.save();
      return { id: savedComment._id, content, authorId, postId };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  async countComments(req, res) {
    try {
      const { postId } = req.params;

      const commentCount = await Comment.countDocuments({ postId }).exec();

      return res.status(200).json({ count: commentCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateComment(id, content) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      if (updatedComment) {
        return { id: updatedComment._id, content: updatedComment.content };
      } else {
        throw new Error("Comment not found");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getCommentsByPostId(postId) {
    try {
      return await Comment.find({ postId });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async deleteCommentById(commentId) {
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (deletedComment) {
        return { id: deletedComment._id };
      } else {
        throw new Error("Comment not found");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getUserByCommentId(userId) {
    try {
      const user = await User.findById(userId);
      return user
        ? { username: user.username, profilePicture: user.profilePicture }
        : null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

module.exports = new CommentController();
