const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const announcementController = require('../controllers/announcementController');

// Multer storage for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `announcement-${Date.now()}${ext}`);
  }
});

// PDF-only filter
const fileFilter = (req, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf';
  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files (.pdf) are allowed'), false);
  }
};

// 500 KB strict limit (500 * 1024 = 512,000 bytes)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 }
});

// Wrapper to catch Multer errors (e.g. LIMIT_FILE_SIZE)
const uploadPdfMiddleware = (req, res, next) => {
  const singleUpload = upload.single('pdf');
  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds maximum limit of 500 KB' });
      }
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.get('/', announcementController.getAnnouncements);
router.post('/', uploadPdfMiddleware, announcementController.createAnnouncement);
router.put('/:id', uploadPdfMiddleware, announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
