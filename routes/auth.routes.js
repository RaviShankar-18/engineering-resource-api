const express = require("express");
const { login, getProfile } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
