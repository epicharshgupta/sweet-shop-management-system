const Sweet = require("../models/Sweet");

// CREATE SWEET
exports.createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// GET ALL SWEETS
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// UPDATE SWEET
exports.updateSweet = async (req, res) => {
  try {
    const sweetId = req.params.id;

    const updated = await Sweet.findByIdAndUpdate(sweetId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// DELETE SWEET (ADMIN ONLY)
exports.deleteSweet = async (req, res) => {
  try {
    const sweetId = req.params.id;

    const deleted = await Sweet.findByIdAndDelete(sweetId);

    if (!deleted) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// PURCHASE SWEET
exports.purchaseSweet = async (req, res) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// RESTOCK (ADMIN ONLY)
exports.restockSweet = async (req, res) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// SEARCH SWEETS
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
