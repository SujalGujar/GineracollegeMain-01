const express = require('express');
const router = express.Router();
const bondController = require('../controllers/bondController');

router.get('/', bondController.getBonds);
router.post('/', bondController.createBond);
router.put('/:id', bondController.updateBond);
router.delete('/:id', bondController.deleteBond);

module.exports = router;
