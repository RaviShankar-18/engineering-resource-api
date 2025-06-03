const express = require("express");
const {
  getAllProjects,
  createProject,
  getProjectById,
} = require("../controllers/project.controller");
const {
  authenticateToken,
  requireManager,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticateToken, getAllProjects);
router.post("/", authenticateToken, requireManager, createProject);
router.get("/:id", authenticateToken, getProjectById);

module.exports = router;
