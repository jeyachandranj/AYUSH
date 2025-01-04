const express = require("express");
const multer = require("multer");
const documentController = require("../controllers/documentController"); // Import the controller
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to protect routes
const router = express.Router();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the route and pass the controller function
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "gmpCertificate" },
    { name: "coppCertificate" },
    { name: "ayushLicenseCertificate" },
    { name: "manufacturingLicense" },
    { name: "companyIncorporationCertificate" },
  ]),
  documentController.uploadFiles
); // Pass the controller method here
router.get("/getdocuments", authMiddleware, documentController.getDocuments);
router.post(
  "/uploadimage",
  upload.any(),
  authMiddleware,
  documentController.uploadImage
);
router.post(
  "/verifyDocument",
  authMiddleware,
  upload.fields([
    { name: "gmpCertificate" },
    { name: "coppCertificate" },
    { name: "ayushLicenseCertificate" },
    { name: "manufacturingLicense" },
    { name: "companyIncorporationCertificate" },
  ]),
  documentController.verifyDocument
);
router.post("");
module.exports = router;
