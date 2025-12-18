const cloudinary = require('cloudinary').v2;

require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Config Loaded:'); 
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key exists:', !!process.env.CLOUDINARY_API_KEY); 
console.log('API Secret exists:', !!process.env.CLOUDINARY_API_SECRET);

module.exports = cloudinary;