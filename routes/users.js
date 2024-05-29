const express = require("express");
const { getUsers, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
