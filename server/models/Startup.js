const mongoose = require("mongoose");

// Define the schema for bank details
const BankDetailsSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: String,
  ifscCode: String,
});

// Define the schema for various certificates and documents
const DocumentSchema = new mongoose.Schema({
  gmpCertificateNumber: String,
  coppCertificateNumber: String,
  ayushLicenseCertificateNumber: String,
  manufacturingLicenseNumber: String,
  companyIncorporationCertificateNumber: String,
  gmpCertificate: String,
  coppCertificate: String,
  ayushLicenseCertificate: String,
  manufacturingLicense: String,
  companyIncorporationCertificate: String,
});

// Define the schema for address details
const AddressSchema = new mongoose.Schema({
  addressLine: String, // Changed to match the frontend
  state: String, // Changed to match the frontend
  district: String, // Changed to match the frontend
  pincode: String, // Changed to match the frontend
  type: { type: String, enum: ["office", "manufacturing"] },
});

// Define the schema for person details
const PersonSchema = new mongoose.Schema({
  name: String,
  dinDpin: String,
  id: String,
  designation: String,
  mobile: String,
  email: String,
  postalAddress: String,
  gender: String,
  type: { type: String, enum: ["representative", "director", "founder"] },
});

// Define the schema for additional details
const DetailsSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

// Define the main schema for startup
const StartupSchema = new mongoose.Schema({
  name: String,
  typeOfEntity: { type: String, enum: ["private", "partnership"] },
  logo: [String],
  sector: {
    type: String,
    enum: ["Ayurvedha", "Sidha", "Yoga", "Unani", "Homeopathy"],
  },
  dateOfIncorporation: Date,
  CINNumber: String,
  registeredAddress: String,
  contactPerson: String,
  manufacturingUnitAddress: String,
  productCategory: String,
  productionCapacity: Number,
  Address: [AddressSchema], // Array of addresses
  Person: [PersonSchema], // Array of persons
  Details: [DetailsSchema], // Array of details/questions
  documents: DocumentSchema,
  bankDetails: BankDetailsSchema,
  panCard: String,
  gstRegistrationNo: String,
  ieCode: String,
  termsAndCondition: Boolean,
  capitalInvestment: Number,
  message: String,
  Stage: {
    type: String,
    enum: ["ideathon", "earlytraction", "validation", "scaling"],
  },
  progress: String,
  status: {
    type: String,
    enum: [
      "start",
      "upload",
      "initial",
      "verify",
      "pending",
      "approved",
      "rejected",
      "proceed",
    ],
    default: "start",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Startup", StartupSchema);
