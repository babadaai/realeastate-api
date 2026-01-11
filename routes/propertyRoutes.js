const express = require('express');
const {
  createProperty,
  getProperties,
  getPropertyBySlug,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/protect');
const upload = require('../middleware/upload');

const router = express.Router();


router.get('/', getProperties);                   
router.get('/:slug', getPropertyBySlug);           

router.post('/', protect, upload.array('gallery', 10), createProperty);       
router.put('/:id', protect, upload.array('gallery', 10), updateProperty);       


router.delete('/:id', protect, deleteProperty);   

module.exports = router;