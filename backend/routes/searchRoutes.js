// routes/searchRoutes.js

const express = require("express");
const searchRouter = express.Router();
const searchController = require("../controllers/searchController");

searchRouter.post("/search/author", searchController.searchAuthor);
searchRouter.post("/search/title", searchController.searchTitle);
searchRouter.post("/search/content", searchController.searchContent);

module.exports = searchRouter;
