const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

router.get('/', departmentController.getDepartments);
router.get('/:slug', departmentController.getDepartmentBySlug);
router.post('/', upload.single('logo'), departmentController.createDepartment);
router.put('/:id', upload.single('logo'), departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);
router.post('/seed', departmentController.seedDepartments);

module.exports = router;
