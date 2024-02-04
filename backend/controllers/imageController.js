const Image = require("../models/image");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage }).single("image");

// Upload image
const uploadImage = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }
      const { filename, path } = req.file;
      const newImage = new Image({ filename, path });
      const savedImage = await newImage.save();

      res.status(201).json(savedImage);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete image by ID
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    if (image.filename === "profil.jpg") {
      return res.json({ message: "'profil.jpg' cannot be deleted" });
    }

    const deletedImage = await Image.findByIdAndDelete(imageId);
    res.json(deletedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get image by ID
const getImageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      res.status(404).json({ error: "Image not found" });
    } else {
      res.json(image);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const imageController = {
  uploadImage,
  deleteImage,
  getImageById,
};

module.exports = imageController;
