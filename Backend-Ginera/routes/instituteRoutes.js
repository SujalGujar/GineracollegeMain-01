const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

router.get('/', instituteController.getInstitutes);
router.post('/', instituteController.createInstitute);
router.put('/:id', instituteController.updateInstitute);
router.delete('/:id', instituteController.deleteInstitute);

module.exports = router;
