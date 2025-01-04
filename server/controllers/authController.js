const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret, expiresIn } = require("../config/jwt");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Vonage } = require("@vonage/server-sdk");
// Initialize Nexmo (Vonage) client
const vonage = new Vonage({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});
exports.register = async (req, res) => {
  let { name, email, password, role, mobile } = req.body;
  if (!role) role = "stakeholder";
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, email, password, role, mobile });
    if (role === "clerk") {
      user.otpVerified = true;
    }
    await user.save();
    //jwt.sign(payload, secret, { expiresIn }, (err, token) => {
    //if (err) throw err;
    res.status(201).json("user registered");
    //});
    //console.log(user);
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !user.otpVerified) {
      return res.status(400).json({ msg: "Invalid email credentials" });
    }
    // Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password credentials" });
    }

    // If password matches, create a JWT token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.modifyUserName = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    user.name = name || user.name;
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;
  console.log(mobile);

  if (
    !process.env.NEXMO_API_KEY ||
    !process.env.NEXMO_API_SECRET ||
    !process.env.NEXMO_PHONE_NUMBER
  ) {
    return res.status(400).json({ msg: "Nexmo credentials not found" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //console.log(user);
    // Send OTP to the user's mobile number
    vonage.sms.send(
      {
        from: process.env.NEXMO_PHONE_NUMBER,
        to: mobile,
        text: `hello ${user.name} Your OTP code is ${otp} don't share to anyone`,
      },
      (err, responseData) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        } else {
          if (responseData.messages[0].status === "0") {
            console.log("Message sent successfully.");
          } else {
            console.error(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
            return res.status(500).send("Failed to send OTP");
          }
        }
      }
    );
    // Save the OTP to the user's document (hashed) or in-memory store (like Redis)
    user.otp = otp; // You might want to hash the OTP before saving
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();
    console.log(user);
    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    // Find the user by mobile number
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ msg: "Invalid mobile number" });
    }

    // Check if OTP is valid
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    user.otpVerified = true;
    // Save the updated user document
    await user.save();

    // OTP is valid, create a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    // Clear the OTP after successful verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.forgotPassword = async (req, res) => {
  const { mobile } = req.body;

  if (
    !process.env.NEXMO_API_KEY ||
    !process.env.NEXMO_API_SECRET ||
    !process.env.NEXMO_PHONE_NUMBER
  ) {
    return res.status(400).json({ msg: "Nexmo credentials not found" });
  }

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP via SMS
    vonage.sms.send(
      {
        from: process.env.NEXMO_PHONE_NUMBER,
        to: mobile,
        text: `Your OTP for password reset is ${otp}`,
      },
      (err, responseData) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Server error");
        } else {
          if (responseData.messages[0].status === "0") {
            console.log("OTP sent successfully.");
          } else {
            console.error(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
            return res.status(500).send("Failed to send OTP");
          }
        }
      }
    );

    // Save OTP and expiry time to the user document
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Route to reset password
exports.resetPassword = async (req, res) => {
  const { mobile, otp, newPassword } = req.body;
  console.log(mobile, otp, newPassword);
  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if OTP is valid
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
