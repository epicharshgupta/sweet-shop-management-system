const express = require("express");
const router = express.Router();

const { createSweet, getAllSweets,updateSweet,
  deleteSweet } = require("../controllers/sweetController");

// Protected routes, but अभी हम auth middleware बाद में जोड़ेंगे
router.post("/", createSweet);
router.get("/", getAllSweets);
// Update sweet
router.put("/:id", updateSweet);

// Delete sweet
router.delete("/:id", deleteSweet); 
module.exports = router;
