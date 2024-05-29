const express = require("express");
const {
  getAllMonies,
  getMoneyById,
  createMoney,
  updateMoney,
  deleteMoney,
  deleteAllMonies,
} = require("../controllers/moneyController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllMonies);
router.get("/:id", authMiddleware, getMoneyById);
router.post("/", authMiddleware, createMoney);
router.put("/:id", authMiddleware, updateMoney);
router.delete("/:id", authMiddleware, deleteMoney);
router.delete("/", authMiddleware, deleteAllMonies);

module.exports = router;
