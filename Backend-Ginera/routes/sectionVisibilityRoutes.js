const express = require('express');
const router = express.Router();
const sectionVisibilityController = require('../controllers/sectionVisibilityController');

router.get('/', sectionVisibilityController.getAllSectionVisibility);
router.put('/bulk', sectionVisibilityController.updateBulkSectionVisibility);
router.put('/:sectionKey', sectionVisibilityController.updateSectionVisibility);

module.exports = router;
