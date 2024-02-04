const express = require("express");
const visitRouter = express.Router();
const visitController = require("../controllers/visitController");

visitRouter.post("/visit/register-visit", async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const result = await visitController.registerVisit(postId, userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

visitRouter.get("/visit/:postId/visit-count", async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await visitController.getVisitCountByPostId(postId);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = visitRouter;
