const express = require('express');
const router = express.Router();
const c = require('../controllers/admissionController');

// Courses
router.get('/courses', c.getCourses);
router.post('/courses', c.createCourse);
router.put('/courses/:id', c.updateCourse);
router.delete('/courses/:id', c.deleteCourse);

// Admission Procedure Steps
router.get('/steps', c.getAdmissionSteps);
router.post('/steps', c.createAdmissionStep);
router.put('/steps/:id', c.updateAdmissionStep);
router.delete('/steps/:id', c.deleteAdmissionStep);

// Admission Rules
router.get('/rules', c.getAdmissionRules);
router.post('/rules', c.createAdmissionRule);
router.put('/rules/:id', c.updateAdmissionRule);
router.delete('/rules/:id', c.deleteAdmissionRule);

module.exports = router;
