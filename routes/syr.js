const express = require("express");
const {
  getAllSyr,
  getSyrById,
  createSyr,
  updateSyr,
  deleteSyr,
  deleteAllSyr,
} = require("../controllers/syrController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllSyr);
router.get("/:id", authMiddleware, getSyrById);
router.post("/", authMiddleware, createSyr);
router.put("/:id", authMiddleware, updateSyr);
router.delete("/:id", authMiddleware, deleteSyr);
router.delete("/", authMiddleware, deleteAllSyr);

module.exports = router;
