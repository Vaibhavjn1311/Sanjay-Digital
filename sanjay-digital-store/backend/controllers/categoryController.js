const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    // This will cascade delete subcategories and products due to pre hooks
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category removed' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get subcategories for a category
// @route   GET /api/categories/:categoryId/subcategories
// @access  Public
const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({ category: req.params.categoryId });
    res.json(subcategories);
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a subcategory
// @route   POST /api/categories/:categoryId/subcategories
// @access  Private/Admin
const createSubcategory = async (req, res) => {
  const { name } = req.body;

  try {
    const subcategory = new Subcategory({
      name,
      category: req.params.categoryId
    });
    await subcategory.save();
    
    // Add subcategory to category's subcategories array
    await Category.findByIdAndUpdate(req.params.categoryId, {
      $push: { subcategories: subcategory._id }
    });

    res.status(201).json(subcategory);
  } catch (error) {
    console.error('Create subcategory error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Subcategory already exists for this category' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Delete a subcategory
// @route   DELETE /api/categories/:categoryId/subcategories/:subcategoryId
// @access  Private/Admin
const deleteSubcategory = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.subcategoryId);
    
    // Remove subcategory from category's subcategories array
    await Category.findByIdAndUpdate(req.params.categoryId, {
      $pull: { subcategories: req.params.subcategoryId }
    });

    res.json({ message: 'Subcategory removed' });
  } catch (error) {
    console.error('Delete subcategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  getSubcategories,
  createSubcategory,
  deleteSubcategory
};