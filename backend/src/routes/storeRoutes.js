const express = require("express");
const Store = require("../models/Store");
const router = express.Router();

router.get("/stores", async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" }; 
    }
    if (req.query.address) {
      query.address = { $regex: req.query.address, $options: "i" };
    }

    const stores = await Store.find(query);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stores" });
  }
});

module.exports = router;
