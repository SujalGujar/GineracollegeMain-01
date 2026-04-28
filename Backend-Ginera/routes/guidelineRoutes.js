const express = require('express');
const router = express.Router();
const guidelineController = require('../controllers/guidelineController');

router.get('/', guidelineController.getAllGuidelines);
router.post('/', guidelineController.createGuideline);
router.put('/:id', guidelineController.updateGuideline);
router.delete('/:id', guidelineController.deleteGuideline);

module.exports = router;
