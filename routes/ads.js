const express = require("express");
const router = express.Router();
const Ads = require("../models/Ads");

// Create a new ad
router.post("/create", async (req, res) => {
  try {
    const newAd = new Ads(req.body);
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all ads
router.get("/allads", async (req, res) => {
  try {
    const ads = await Ads.find();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;

    // Check if the category is valid (Home Ads or Directory Ads)
    if (category !== "Home Ads" && category !== "Directory Ads") {
      return res.status(400).json({ error: "Invalid category" });
    }

    const ads = await Ads.find({ category });
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific ad by ID
router.get("/get/:id", async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific ad by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAd = await Ads.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });
    if (!updatedAd) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.status(200).json(updatedAd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific ad by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAd = await Ads.findByIdAndRemove(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.status(204).end(); // No content response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
