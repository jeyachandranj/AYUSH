const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

router.post(
  "/get-certificate-data",
  auth,
  certificateController.getCertificateData
);

module.exports = router;
