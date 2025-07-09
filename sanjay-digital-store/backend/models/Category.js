const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
      // required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);