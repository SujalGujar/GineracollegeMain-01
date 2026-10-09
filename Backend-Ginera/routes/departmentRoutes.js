const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

const facultyUpload = multer({
  storage,
  limits: { fileSize: 500 * 1024 }, // 500 KB limit for faculty photos
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (PNG, JPG, JPEG, WEBP) are allowed'), false);
    }
  }
});

router.get('/', departmentController.getDepartments);
router.post('/upload-faculty-image', (req, res, next) => {
  facultyUpload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Image size exceeds 500KB. Please choose an image smaller than 500KB.' });
      }
      return res.status(400).json({ message: err.message || 'Image upload failed' });
    }
    departmentController.uploadFacultyImage(req, res, next);
  });
});
router.get('/:slug', departmentController.getDepartmentBySlug);
router.post('/', upload.single('logo'), departmentController.createDepartment);
router.put('/:id', upload.single('logo'), departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);
router.post('/seed', departmentController.seedDepartments);

module.exports = router;
