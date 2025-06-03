const express = require("express");
const {
  getAllEngineers,
  getEngineerCapacity,
} = require("../controllers/engineer.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getAllEngineers);
router.get("/:id/capacity", authenticateToken, getEngineerCapacity);

module.exports = router;
