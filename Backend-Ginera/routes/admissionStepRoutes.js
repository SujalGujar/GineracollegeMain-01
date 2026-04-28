const express = require('express');
const router = express.Router();
const admissionStepController = require('../controllers/admissionStepController');

router.get('/', admissionStepController.getAllSteps);
router.post('/', admissionStepController.createStep);
router.put('/:id', admissionStepController.updateStep);
router.delete('/:id', admissionStepController.deleteStep);

module.exports = router;
