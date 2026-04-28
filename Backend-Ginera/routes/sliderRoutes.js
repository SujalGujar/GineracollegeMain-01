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

router.get('/', sliderController.getSliders);
router.post('/upload', upload.array('images', 20), sliderController.uploadSliders);
router.put('/:id', upload.single('image'), sliderController.updateSlider);
router.delete('/:id', sliderController.deleteSlider);
router.get('/cleanup/invalid', async (req, res) => {
  try {
    const Slider = require('../models/Slider');
    await Slider.collection.deleteMany({ department: 'all' });
    await Slider.collection.deleteMany({ department: 'null' });
    res.send('Cleaned');
  } catch(e) { res.status(500).send(e.message); }
});

module.exports = router;
