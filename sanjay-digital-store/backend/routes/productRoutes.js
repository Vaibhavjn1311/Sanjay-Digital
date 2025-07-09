const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // handles cloudinary uploads

const router = express.Router();

// GET all products, POST a new product with image uploads
router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.array('images', 10), createProduct);

// GET one, UPDATE with image uploads, DELETE product
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, upload.array('images', 10), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
