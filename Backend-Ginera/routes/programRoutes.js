const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const multer = require('multer');
const path = require('path');

// Multer config for program images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', programController.getPrograms);
router.post('/', upload.single('image'), programController.createProgram);
router.put('/:id', upload.single('image'), programController.updateProgram);
router.delete('/:id', programController.deleteProgram);

module.exports = router;
