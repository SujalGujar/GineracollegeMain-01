const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Key Persons
router.get('/key-persons', contactController.getKeyPersons);
router.post('/key-persons', contactController.createKeyPerson);
router.put('/key-persons/:id', contactController.updateKeyPerson);
router.delete('/key-persons/:id', contactController.deleteKeyPerson);

// Departments
router.get('/departments', contactController.getDepartments);
router.post('/departments', contactController.createDepartment);
router.put('/departments/:id', contactController.updateDepartment);
router.delete('/departments/:id', contactController.deleteDepartment);

// Info
router.get('/info', contactController.getContactInfo);
router.put('/info', contactController.updateContactInfo);

module.exports = router;
