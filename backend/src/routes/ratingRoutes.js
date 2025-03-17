const express = require("express");
const Rating = require("../models/Rating");
const Store = require("../models/Store");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only normal users can submit ratings" });
  }

  const { storeId, rating } = req.body;

  if (!storeId || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid store ID or rating must be between 1 and 5" });
  }

  try {
    let userRating = await Rating.findOne({ where: { userId: req.user.id, storeId } });

    if (userRating) {
      userRating.rating = rating;
      await userRating.save();
      return res.json({ message: "Rating updated successfully", userRating });
    }

    userRating = await Rating.create({ userId: req.user.id, storeId, rating });

    const ratings = await Rating.findAll({ where: { storeId } });
    const avgRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    const store = await Store.findByPk(storeId);
    store.rating = avgRating.toFixed(1);
    await store.save();

    res.json({ message: "Rating submitted successfully", userRating, avgRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:storeId", async (req, res) => {
  const { storeId } = req.params;

  try {
    const ratings = await Rating.findAll({ where: { storeId } });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/user/:storeId", authMiddleware, async (req, res) => {
  const { storeId } = req.params;

  try {
    const rating = await Rating.findOne({ where: { storeId, userId: req.user.id } });
    if (!rating) {
      return res.status(404).json({ message: "No rating found for this store" });
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
