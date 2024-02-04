//routes/userRoutes.js

const express = require("express");
const UserController = require("../controllers/userController");
const userRouter = express.Router();

// Route to get all users
userRouter.get("/users", async (req, res) => {
  try {
    const allUsers = await UserController.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserController.getUser(userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/users/:userId/password", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    await UserController.modifyPassword(userId, newPassword);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/users/:userId/avatar", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newAvatar } = req.body;
    await UserController.modifyAvatar(userId, newAvatar);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/users/:userId/username", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;
    await UserController.modifyUsername(userId, newUsername);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/users/:userId/email", async (req, res) => {
  try {
    const { userId } = req.params;
    const { newEmail } = req.body;
    await UserController.modifyEmail(userId, newEmail);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/users/:userId/promote", async (req, res) => {
  try {
    const { userId } = req.params;
    await UserController.promoteToAdmin(userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await UserController.deleteUser(userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserController.isUsername(username);
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserController.isEmail(email);
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/users/create", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await UserController.createUser(username, email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", UserController.login);

userRouter.post("/users/:userId/verifyPassword", async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Old password is required." });
    }

    const verificationResult = await UserController.passwordVerification(
      userId,
      password
    );

    res.json(verificationResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/users/username/:username/userid", async (req, res) => {
  await UserController.findUserIdByUsername(req, res);
});

userRouter.put("/users/:userId/disable", UserController.toggleUserStatus);

module.exports = userRouter;
