const mongoose = require("mongoose");

const gmpSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  holderName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  additionalDetails: { type: String },
});

const coppSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  holderName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  additionalDetails: { type: String },
});

const ayushSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  holderName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  additionalDetails: { type: String },
});

const manufacturingLicenseSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  holderName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  additionalDetails: { type: String },
});

const companyIncorporationSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  incorporationDate: { type: Date, required: true },
  country: { type: String, required: true },
  additionalDetails: { type: String },
});

// Exporting schemas as models
module.exports = {
  GMP: mongoose.model("GMP", gmpSchema),
  COPP: mongoose.model("COPP", coppSchema),
  AYUSH: mongoose.model("AYUSH", ayushSchema),
  ManufacturingLicense: mongoose.model(
    "ManufacturingLicense",
    manufacturingLicenseSchema
  ),
  CompanyIncorporation: mongoose.model(
    "CompanyIncorporation",
    companyIncorporationSchema
  ),
};
