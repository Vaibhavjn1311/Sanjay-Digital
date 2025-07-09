// backend/utils/storage.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images', // optional folder name
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

module.exports = storage;
