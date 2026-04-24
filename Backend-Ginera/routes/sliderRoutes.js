const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sliderController = require('../controllers/sliderController');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/upload', upload.array('images', 20), sliderController.uploadSliderImages);
router.get('/', sliderController.getSliders);
router.delete('/:id', sliderController.deleteSlider);

module.exports = router;
