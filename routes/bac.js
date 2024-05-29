const express = require("express");
const {
  getAllBac,
  getBacById,
  createBac,
  updateBac,
  deleteBac,
  deleteAllBac,
} = require("../controllers/bacController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllBac);
router.get("/:id", authMiddleware, getBacById);
router.post("/", authMiddleware, createBac);
router.put("/:id", authMiddleware, updateBac);
router.delete("/:id", authMiddleware, deleteBac);
router.delete("/", authMiddleware, deleteAllBac);

module.exports = router;
