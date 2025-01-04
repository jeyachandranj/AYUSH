const express = require("express");
const {
  createStartupStepOne,
  createStartupStepTwo,
  createStartupStepThree,
  getStartups,
  getStartupById,
  sendMail,
  createStartup,
  getAllStartupsData,
} = require("../controllers/startupController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/createStartup", auth, createStartup);
router.post("/sendmail", auth, sendMail);
router.get("/getStartupById", auth, getStartupById);
router.get("/getAllStartupsData", auth, getAllStartupsData);
router.get("/:id", auth, getStartupById);

module.exports = router;
