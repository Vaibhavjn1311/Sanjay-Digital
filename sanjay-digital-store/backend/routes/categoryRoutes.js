const express = require('express');
const { 
  getCategories, 
  createCategory, 
  deleteCategory,
  getSubcategories,
  createSubcategory,
  deleteSubcategory
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, createCategory);

router.route('/:id')
  .delete(protect, admin, deleteCategory);

router.route('/:categoryId/subcategories')
  .get(getSubcategories)
  .post(protect, admin, createSubcategory);

router.route('/:categoryId/subcategories/:subcategoryId')
  .delete(protect, admin, deleteSubcategory);

module.exports = router;