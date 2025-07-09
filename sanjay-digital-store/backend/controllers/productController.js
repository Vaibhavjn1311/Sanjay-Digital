const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    let query = {};
    const { category } = req.query;

    if (category) query.category = category;
    // if (subcategory) query.subcategory = subcategory;

    const products = await Product.find(query)
      .populate('category')
     // .populate('subcategory');

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      // .populate('subcategory');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Get paths of uploaded files
    const images = req.files.map(file => file.path);

    const product = new Product({
      name,
      description,
      price,
      images,
      category,
      // subcategory
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

// ..................
// const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subcategory, existingImages = [] } = req.body;
    
//     // Get paths of newly uploaded files
//     const newImages = req.files ? req.files.map(file => file.path) : [];
    
//     // Combine existing and new images
//     const images = [...existingImages, ...newImages];

//     const product = await Product.findById(req.params.id);

//     if (product) {
//       product.name = name || product.name;
//       product.description = description || product.description;
//       product.price = price || product.price;
//       product.images = images.length > 0 ? images : product.images;
//       product.category = category || product.category;
//       product.subcategory = subcategory || product.subcategory;

//       const updatedProduct = await product.save();
//       res.json(updatedProduct);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error('Update product error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// .........................

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, existingImages = [] } = req.body;
    
    // Get paths of newly uploaded files and normalize paths
    const newImages = req.files 
      ? req.files.map(file => file.path.replace(/\\/g, '/')) 
      : [];
    
    // Filter out any empty/null values and normalize existing paths
    const normalizedExisting = Array.isArray(existingImages)
      ? existingImages.filter(img => img).map(img => img.replace(/\\/g, '/'))
      : [];

    // Combine existing and new images (remove duplicates)
    const images = [...new Set([...normalizedExisting, ...newImages])];

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update only changed fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    // product.subcategory = subcategory || product.subcategory;
    
    // Only update images if we have new ones or existing were modified
    if (images.length > 0) {
      product.images = images;
    }

    const updatedProduct = await product.save();
    
    res.json({
      ...updatedProduct.toObject(),
      // Ensure frontend gets properly formatted paths
      images: updatedProduct.images.map(img => img.replace(/\\/g, '/'))
    });
    
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete each image from Cloudinary
    for (const imageUrl of product.images) {
      const publicId = extractCloudinaryPublicId(imageUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await product.deleteOne();

    res.json({ message: 'Product and associated images deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

// Utility to extract publicId from Cloudinary URL
function extractCloudinaryPublicId(url) {
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1]; // e.g., abc123.jpg
    const publicId = filename.substring(0, filename.lastIndexOf('.')); // remove extension
    return parts.slice(-2, -1)[0] + '/' + publicId; // e.g., "foldername/abc123"
  } catch (err) {
    return null;
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};