const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/createcategory', async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });    
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Get all categories
router.get('/getallcategories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

module.exports = router;
