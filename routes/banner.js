const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");

// Create a new banner
router.post("/banners", async (req, res) => {
  try {
    const { name, image } = req.body;
    const newBanner = new Banner({ name, image });
    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single banner by ID
router.get("/banners/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a banner by ID
router.put("/banners/:id", async (req, res) => {
  try {
    const { name, image } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );
    if (!updatedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a banner by ID
router.delete("/banners/:id", async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndRemove(req.params.id);
    if (!deletedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
