const express = require("express");
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const {
  getStartupsByStatus,
  getStartupById,
  updateStartupStatus,
} = require("../controllers/governmentController");
const { register } = require("../controllers/authController");

const router = express.Router();

// Routes for Clerk Role
router.get("/", auth, (req, res) => getStartupsByStatus(req, res, "approved"));

router.post("/create", auth, checkRole("authority"), (req, res) =>
  register(req, res)
);

router.get("/startups", auth, (req, res) =>
  getStartupsByStatus(req, res, "view")
);
router.get("/startups/:id", auth, getStartupById);

router.patch("/startups/verify/:id", auth, (req, res) =>
  updateStartupStatus(req, res, "verify")
);
router.patch("/startups/reject/:id", auth, (req, res) =>
  updateStartupStatus(req, res, "rejected")
);

module.exports = router;
