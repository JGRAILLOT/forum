// controllers/UserController.js

const User = require("../models/user.js");
const Image = require("../models/image");
const hashFunction = require("../hash.js");

class UserController {
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async modifyAvatar(userId, newAvatar) {
    try {
      await User.findByIdAndUpdate(userId, {
        newAvatar,
      });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async modifyPassword(userId, newPassword) {
    try {
      await User.findByIdAndUpdate(userId, {
        password: hashFunction(newPassword),
      });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async modifyUsername(userId, newUsername) {
    try {
      await User.findByIdAndUpdate(userId, { username: newUsername });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async modifyEmail(userId, newEmail) {
    try {
      await User.findByIdAndUpdate(userId, { email: newEmail });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async promoteToAdmin(userId) {
    try {
      await User.findByIdAndUpdate(userId, { isAdmin: true });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async isUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async isEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async checkIfUserExists(username, email) {
    try {
      const count = await User.countDocuments({
        $or: [{ username }, { email }],
      });
      return count > 0;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async createUser(username, email, password) {
    try {
      const hashedPassword = hashFunction(password);
      const image = await Image.findOne({ filename: "profil.jpg" });

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        picture: image,
      });

      const savedUser = await newUser.save();
      return { success: true, userId: savedUser._id };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        username: username,
        password: hashFunction(password),
      });
      if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid username/email or password" });
      }

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async passwordVerification(userId, password) {
    try {
      // Check if oldPassword is undefined or null
      if (password === undefined || password === null) {
        return { isCorrect: false };
      }

      const user = await User.findById(userId);

      if (!user) {
        return { isCorrect: false };
      }

      const hashedPassword = hashFunction(password);

      if (hashedPassword === user.password) {
        return { isCorrect: true };
      } else {
        return { isCorrect: false };
      }
    } catch (error) {
      console.error("Error during password verification:", error);
      throw error;
    }
  }
  async findUserIdByUsername(req, res) {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ userId: user._id });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async findUserIdByUsername(req, res) {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ userId: user.id });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async toggleUserStatus(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.disabled = !user.disabled;
      await user.save();

      res.json({
        message: "User status updated successfully",
        disabled: user.disabled,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
