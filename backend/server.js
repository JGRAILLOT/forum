const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Image = require("./models/image");

// Import routers
const voteRouter = require("./routes/voteRoutes");
const commentRouter = require("./routes/commentRoutes");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const searchRouter = require("./routes/searchRoutes");
const imageRouter = require("./routes/imageRoutes");
const visitRouter = require("./routes/visitRoutes");
const app = express();
const PORT = 3000;

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/forum", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routers
app.use("/api", voteRouter);
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", searchRouter);
app.use("/api", imageRouter);
app.use("/api", visitRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to your API!");
});

// Create a default profile image if it doesn't exist
const createDefaultProfileImage = async () => {
  try {
    const imagePath = path.join(__dirname, "uploads/", "profil.jpg");

    // Check if the image already exists
    const existingImage = await Image.findOne({ filename: "profil.jpg" });
    if (existingImage) {
      console.log("Default profile image already exists.");
      return;
    }

    // Check if the image file exists in the directory
    if (fs.existsSync(imagePath)) {
      console.log("Creating default profile image...");

      // Save the default profile image to the database
      const defaultProfileImage = new Image({
        filename: "profil.jpg",
        path: "/uploads/profil.jpg",
      });

      await defaultProfileImage.save();
      console.log("Default profile image created successfully!");
    } else {
      console.log("Default profile image found in the directory.");
    }
  } catch (error) {
    console.error("Error creating/verifying default profile image:", error);
  }
};
// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await createDefaultProfileImage();
});
