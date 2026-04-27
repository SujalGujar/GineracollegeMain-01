const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', testimonialController.getAllTestimonials);
router.post('/', upload.single('image'), testimonialController.createTestimonial);
router.put('/:id', upload.single('image'), testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
