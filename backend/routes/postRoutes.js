// routes/postRoutes.js
const express = require("express");
const postRouter = express.Router();
const PostController = require("../controllers/PostController");

// Create a new post
postRouter.post("/posts", async (req, res) => {
  const { title, content, picture = null, authorId } = req.body;

  try {
    const postId = await PostController.createPost(
      title,
      content,
      picture,
      authorId
    );
    res.status(201).json({ postId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.get("/posts/last", PostController.getLastPost);

// Delete a post by ID
postRouter.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const isDeleted = await PostController.deletePost(postId);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post by ID
postRouter.put("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { title, content, authorId, picture = null } = req.body;

  try {
    await PostController.updatePost(postId, title, content, authorId, picture);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a post by ID
postRouter.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await PostController.getPostById(postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = postRouter;
