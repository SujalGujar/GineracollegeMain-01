const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/:section', contentController.getContent);
router.put('/:section', contentController.updateContent);

module.exports = router;
