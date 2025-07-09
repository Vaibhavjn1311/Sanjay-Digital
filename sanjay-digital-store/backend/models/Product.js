const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  // subcategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Subcategory',
  // //  required: false
  // }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);