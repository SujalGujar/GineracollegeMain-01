const express = require('express');
const router = express.Router();
const c = require('../controllers/aboutController');

// Milestones
router.get('/milestones', c.getMilestones);
router.post('/milestones', c.createMilestone);
router.put('/milestones/:id', c.updateMilestone);
router.delete('/milestones/:id', c.deleteMilestone);

// Dean's Message
router.get('/dean', c.getDeanMessage);
router.put('/dean', ...c.updateDeanMessage);

// College Logo
router.get('/college-logo', c.getCollegeLogo);
router.put('/college-logo', ...c.updateCollegeLogo);

// About Page Images
router.get('/images', c.getAboutImages);
router.put('/images/:key', ...c.updateAboutImage);
router.delete('/images/:key', c.clearAboutImage);

// Vision & Mission
router.get('/vision-mission', c.getVisionMission);
router.post('/vision-mission', c.createVisionMission);
router.put('/vision-mission/:id', c.updateVisionMission);
router.delete('/vision-mission/:id', c.deleteVisionMission);

// Core Values
router.get('/core-values', c.getCoreValues);
router.post('/core-values', c.createCoreValue);
router.put('/core-values/:id', c.updateCoreValue);
router.delete('/core-values/:id', c.deleteCoreValue);

module.exports = router;
