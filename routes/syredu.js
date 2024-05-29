const express = require("express");
const {
  getAllSyredu,
  getSyreduById,
  createSyredu,
  updateSyredu,
  deleteSyredu,
  deleteAllSyredu,
} = require("../controllers/syreduController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllSyredu);
router.get("/:id", authMiddleware, getSyreduById);
router.post("/", authMiddleware, createSyredu);
router.put("/:id", authMiddleware, updateSyredu);
router.delete("/:id", authMiddleware, deleteSyredu);
router.delete("/", authMiddleware, deleteAllSyredu);

module.exports = router;
