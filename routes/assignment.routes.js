const express = require("express");
const {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignment.controller");
const {
  authenticateToken,
  requireManager,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getAllAssignments);
router.post("/", authenticateToken, requireManager, createAssignment);
router.put("/:id", authenticateToken, requireManager, updateAssignment);
router.delete("/:id", authenticateToken, requireManager, deleteAssignment);

module.exports = router;
