const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const {
  putInvestorData,
  getAllInvestorData,
  getInvestorById,
} = require("../controllers/investorController");
router.post("/putInvestorData", auth, putInvestorData);
router.get("/getAllInvestorData", auth, getAllInvestorData);
router.get("/:id", auth, getInvestorById);
module.exports = router;
