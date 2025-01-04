const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to protect routes

const router = express.Router();
const {
  register,
  login,
  modifyUserName,
  sendOTP,
  verifyOTP,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");
// Secret key for JWT
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "a78a4e6b00bfb90ddd00fd28f9b78651e0cfa44c629ac5c4edaddc61fc28cf8ceef22a294f7664b5a85600cc24aed8ce1d372b0e331211b34b69e9666e5840ae";
// Register route
router.post("/register", register);
// Login route
router.post("/login", login);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/resetPassword", resetPassword);
router.post("/forgotPassword", forgotPassword);
router.put("/modifyUserName", authMiddleware, modifyUserName);
router.get("/verifyToken", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Protected route example
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
