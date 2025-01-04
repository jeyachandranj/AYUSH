const mongoose = require("mongoose");

const InvestorSchema = new mongoose.Schema({
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
    trim: true,
  },
  budget: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  investmentCategorySector: {
    type: String,
    trim: true,
  },
  panCard: {
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Investor", InvestorSchema);
