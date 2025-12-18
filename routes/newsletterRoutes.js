const express = require('express');
const { subscribe, getSubscribers } = require('../controllers/newsletterController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.post('/subscribe', subscribe);

router.get('/admin/subscribers', protect, getSubscribers);

module.exports = router;