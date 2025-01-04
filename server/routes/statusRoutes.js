const express = require("express");
const auth = require("../middleware/authMiddleware");
const { startupStatus, setStatus } = require("../controllers/statusControllers");
const router = express.Router();

router.get("/startup/:id", auth,startupStatus);
router.get("/startup/form/:id",auth,(req,res)=>setStatus(req,res,"initial"));
router.get("/startup/upload/:id",auth,(req,res)=>setStatus(req,res,"uploaded"));
router.get("/startup/valid/:id",auth,(req,res)=>setStatus(req,res,"pending"));

module.exports = router;
