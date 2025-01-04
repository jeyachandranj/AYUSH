const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: {
    type: String,
    required: false,
    unique: true,
    match: [
      /^\+\d{1,3}\d{10}$/,
      "Please enter a valid mobile number with country code",
    ],
  },
  role: {
    type: String,
    enum: ["startup", "clerk", "authority", "stakeholder","investor","mentor"],
    required: true,
  },
  otpVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  date: { type: Date, default: Date.now },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  next();
});
UserSchema.methods.comparePassword = function (password) {
  console.log(this.password);
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
