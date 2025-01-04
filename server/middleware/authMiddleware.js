const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret } = require("../config/jwt");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: "Authorization denied" });
    }

    next();
  } catch (err) {
    console.error("Token validation error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
