const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const announcementController = require('../controllers/announcementController');

// Multer disk storage for Announcement files (PDF & Excel)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `announcement-${Date.now()}-${sanitizedName}${ext}`);
  }
});

// Allowed file types: PDF and Excel sheets (.pdf, .xlsx, .xls, .csv)
const allowedExtensions = ['.pdf', '.xlsx', '.xls', '.csv'];
const allowedMimetypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'text/csv',
  'application/csv'
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedExtensions.includes(ext);
  const isAllowedMime = allowedMimetypes.includes(file.mimetype) || (ext === '.csv' && (file.mimetype === 'text/plain' || file.mimetype === 'application/octet-stream'));

  if (isAllowedExt && isAllowedMime) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type "${file.originalname}". Only PDF (.pdf) and Excel files (.xlsx, .xls, .csv) are allowed.`), false);
  }
};

// 10 MB limit per file (10 * 1024 * 1024 bytes)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Middleware supporting multiple files under 'files' or backward-compatible 'pdf'
const uploadAnnouncementFilesMiddleware = (req, res, next) => {
  const multiUpload = upload.fields([
    { name: 'files', maxCount: 15 },
    { name: 'pdf', maxCount: 1 }
  ]);

  multiUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds maximum limit of 10 MB per file.' });
      }
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.get('/', announcementController.getAnnouncements);
router.post('/', uploadAnnouncementFilesMiddleware, announcementController.createAnnouncement);
router.put('/:id', uploadAnnouncementFilesMiddleware, announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
