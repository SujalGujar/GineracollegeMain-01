const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const galleryController = require('../controllers/galleryController');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMime = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
  ];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB maximum for images and videos
});

router.get('/', galleryController.getGalleryImages);
router.post('/', upload.single('image'), galleryController.addGalleryImage);
router.put('/:id', upload.single('image'), galleryController.updateGalleryImage);
router.delete('/:id', galleryController.deleteGalleryImage);

module.exports = router;
