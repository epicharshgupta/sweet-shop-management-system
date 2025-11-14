const express = require("express");
const router = express.Router();

const { createSweet, getAllSweets } = require("../controllers/sweetController");

// Protected routes, but अभी हम auth middleware बाद में जोड़ेंगे
router.post("/", createSweet);
router.get("/", getAllSweets);

module.exports = router;
