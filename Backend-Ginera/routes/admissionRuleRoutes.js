const express = require('express');
const router = express.Router();
const admissionRuleController = require('../controllers/admissionRuleController');

router.get('/', admissionRuleController.getAllRules);
router.post('/', admissionRuleController.createRule);
router.put('/:id', admissionRuleController.updateRule);
router.delete('/:id', admissionRuleController.deleteRule);

module.exports = router;
