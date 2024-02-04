//routes/commentRoutes.js

const express = require("express");
const CommentController = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.post("/comments", async (req, res) => {
  try {
    const { content, authorId, postId } = req.body;
    const comment = await CommentController.insertComment(
      content,
      authorId,
      postId
    );
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.get(
  "/comments/:postId/comment-count",
  CommentController.countComments
);

commentRouter.put("/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await CommentController.updateComment(
      commentId,
      content
    );
    res.json({ comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get comments by postId
commentRouter.get("/comments/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CommentController.getCommentsByPostId(postId);
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a comment by commentId
commentRouter.delete("/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await CommentController.deleteCommentById(commentId);
    res.json({ comment: deletedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get user details by ID
commentRouter.get("/comments/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await CommentController.getUserByCommentId(userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = commentRouter;
