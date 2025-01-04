const mongoose = require("mongoose");
const Startup = new mongoose.Schema({
  name: String,
  id: mongoose.Schema.Types.ObjectId,
  email: String,
  role:String,
  mobile: String,
});

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  network: {
    type: String,
    trim: true,
  },
  interest: {
    type: String,
    trim: true,
  },
  logo: {
    type: [String],
    default: [],
  },
  startupState: {
    type: [String],
    default: [],
  },
  interestedCategorySector: {
    type: String,
    trim: true,
  },
  brief: {
    type: String,
    trim: true,
  },
  addressLine: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  step: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  webinarAsked: [Startup],
  webinar: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Mentor", MentorSchema);
