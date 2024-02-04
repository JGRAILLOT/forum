const express = require("express");
const imageController = require("../controllers/imageController");
const imageRouter = express.Router();

imageRouter.post("/image", imageController.uploadImage);
imageRouter.get("/image/:id", imageController.getImageById);
imageRouter.delete("/image/:id", imageController.deleteImage);

module.exports = imageRouter;
