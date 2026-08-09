const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentCornerController');

router.get('/', ctrl.getAllSections);
router.post('/', ctrl.createSection);
router.put('/reorder', ctrl.reorderSections);
router.put('/:id', ctrl.updateSection);
router.delete('/:id', ctrl.deleteSection);

module.exports = router;
