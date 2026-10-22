const Announcement = require('../models/Announcement');
const fs = require('fs');
const path = require('path');
const { uploadFileToCloudinary, deleteFromCloudinary } = require('../utils/uploadToCloudinary');

const MAX_ANNOUNCEMENT_FILES = 5;

// Helper to remove an uploaded file from Cloudinary (or local disk fallback for legacy files)
const removeFile = async (fileOrUrl) => {
  if (!fileOrUrl) return;
  try {
    const fileUrl = typeof fileOrUrl === 'string' ? fileOrUrl : fileOrUrl.fileUrl;
    const publicId = typeof fileOrUrl === 'object' ? fileOrUrl.publicId : null;
    const resourceType = typeof fileOrUrl === 'object' ? fileOrUrl.resourceType : 'auto';

    if (publicId || (fileUrl && fileUrl.includes('cloudinary.com'))) {
      await deleteFromCloudinary(publicId || fileUrl, resourceType);
    } else if (fileUrl && fileUrl.includes('uploads')) {
      const filename = path.basename(fileUrl);
      const fullPath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
  } catch (err) {
    console.warn('Failed to delete file:', err.message);
  }
};

// Determine file type from extension
const getFileType = (fileName) => {
  const ext = path.extname(fileName || '').toLowerCase();
  if (['.xlsx', '.xls', '.csv'].includes(ext)) {
    return 'excel';
  }
  if (ext === '.pdf') {
    return 'pdf';
  }
  return 'other';
};

// GET /api/announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const announcements = await Announcement.find(filter).sort({ order: 1, createdAt: -1 });

    // Normalize announcements so that any legacy item with formUrl also has the files array
    const normalized = announcements.map(doc => {
      const item = doc.toObject();
      if ((!item.files || item.files.length === 0) && item.formUrl) {
        item.files = [{
          fileUrl: item.formUrl,
          fileName: item.formName || 'Attached Document.pdf',
          displayName: item.formName || 'Attached Document',
          fileSize: item.formSize || 0,
          fileType: getFileType(item.formName || item.formUrl),
          publicId: '',
          resourceType: 'auto'
        }];
      }
      return item;
    });

    res.json(normalized);
  } catch (err) {
    console.error('Error fetching announcements:', err);
    res.status(500).json({ message: 'Server error fetching announcements' });
  }
};

// POST /api/announcements
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, subtitle, badge, description, points, isActive, order, fileDetails } = req.body;

    let parsedPoints = [];
    if (points) {
      if (Array.isArray(points)) {
        parsedPoints = points;
      } else if (typeof points === 'string') {
        try {
          parsedPoints = JSON.parse(points);
        } catch {
          parsedPoints = points.split('\n').map(p => p.trim()).filter(Boolean);
        }
      }
    }

    let parsedFileDetails = [];
    if (fileDetails) {
      try {
        parsedFileDetails = typeof fileDetails === 'string' ? JSON.parse(fileDetails) : fileDetails;
      } catch (e) {
        parsedFileDetails = [];
      }
    }

    // Collect newly uploaded files (from 'files' array or 'pdf' single)
    const uploadedFiles = [];
    if (req.files) {
      if (Array.isArray(req.files.files)) {
        uploadedFiles.push(...req.files.files);
      }
      if (Array.isArray(req.files.pdf)) {
        uploadedFiles.push(...req.files.pdf);
      }
    }

    // Limit check: maximum 5 files
    if (uploadedFiles.length > MAX_ANNOUNCEMENT_FILES) {
      return res.status(400).json({
        message: `Maximum ${MAX_ANNOUNCEMENT_FILES} files (PDF & Excel) allowed per announcement. Received ${uploadedFiles.length}.`
      });
    }

    // Upload files to Cloudinary and clean up local backend disk
    const formattedFiles = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const matchedDetail = parsedFileDetails.find(d => d.fileName === file.originalname) || parsedFileDetails[i] || {};
      const displayName = (matchedDetail.displayName || '').trim();

      try {
        const cloudResult = await uploadFileToCloudinary(file.path, 'ginera-announcements');
        formattedFiles.push({
          fileUrl: cloudResult.fileUrl,
          fileName: file.originalname,
          displayName: displayName || file.originalname,
          fileSize: file.size,
          fileType: getFileType(file.originalname),
          publicId: cloudResult.publicId,
          resourceType: cloudResult.resourceType,
        });
      } catch (uploadErr) {
        console.error('Failed to upload file to Cloudinary:', uploadErr);
        formattedFiles.push({
          fileUrl: `/uploads/${file.filename}`,
          fileName: file.originalname,
          displayName: displayName || file.originalname,
          fileSize: file.size,
          fileType: getFileType(file.originalname),
          publicId: '',
          resourceType: 'auto',
        });
      }
    }

    const announcementData = {
      title: title || 'Admission Announcements Will Be Available Soon',
      subtitle: subtitle || '',
      badge: badge || 'Will Be Updated Soon',
      description: description || '',
      points: parsedPoints,
      files: formattedFiles,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true,
      order: order ? Number(order) : 0,
    };

    if (formattedFiles.length > 0) {
      announcementData.formUrl = formattedFiles[0].fileUrl;
      announcementData.formName = formattedFiles[0].displayName || formattedFiles[0].fileName;
      announcementData.formSize = formattedFiles[0].fileSize;
    }

    const newAnnouncement = new Announcement(announcementData);
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error('Error creating announcement:', err);
    res.status(500).json({ message: err.message || 'Error creating announcement' });
  }
};

// PUT /api/announcements/:id
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Announcement.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    const {
      title,
      subtitle,
      badge,
      description,
      points,
      isActive,
      order,
      removeFile: shouldRemoveFile,
      retainedFiles,
      fileDetails
    } = req.body;

    if (title !== undefined) existing.title = title;
    if (subtitle !== undefined) existing.subtitle = subtitle;
    if (badge !== undefined) existing.badge = badge;
    if (description !== undefined) existing.description = description;
    if (isActive !== undefined) existing.isActive = isActive === 'true' || isActive === true;
    if (order !== undefined) existing.order = Number(order);

    if (points !== undefined) {
      if (Array.isArray(points)) {
        existing.points = points;
      } else if (typeof points === 'string') {
        try {
          existing.points = JSON.parse(points);
        } catch {
          existing.points = points.split('\n').map(p => p.trim()).filter(Boolean);
        }
      }
    }

    let parsedFileDetails = [];
    if (fileDetails) {
      try {
        parsedFileDetails = typeof fileDetails === 'string' ? JSON.parse(fileDetails) : fileDetails;
      } catch (e) {
        parsedFileDetails = [];
      }
    }

    // Determine which existing files are retained
    let keptFiles = [];
    if (retainedFiles) {
      let parsedRetained = [];
      try {
        parsedRetained = typeof retainedFiles === 'string' ? JSON.parse(retainedFiles) : retainedFiles;
      } catch (e) {
        parsedRetained = [];
      }

      // Map retained files by fileUrl with their details (including updated displayName)
      const retainedMap = new Map();
      parsedRetained.forEach(f => {
        if (typeof f === 'string') {
          retainedMap.set(f, { fileUrl: f });
        } else if (f && f.fileUrl) {
          retainedMap.set(f.fileUrl, f);
        }
      });
      
      const existingFileList = Array.isArray(existing.files) && existing.files.length > 0
        ? existing.files
        : (existing.formUrl ? [{ fileUrl: existing.formUrl, fileName: existing.formName, displayName: existing.formName, fileSize: existing.formSize, fileType: getFileType(existing.formName) }] : []);

      for (const f of existingFileList) {
        if (retainedMap.has(f.fileUrl)) {
          const updated = retainedMap.get(f.fileUrl);
          keptFiles.push({
            fileUrl: f.fileUrl,
            fileName: f.fileName,
            displayName: (updated.displayName !== undefined ? updated.displayName : f.displayName) || f.fileName,
            fileSize: f.fileSize || 0,
            fileType: f.fileType || getFileType(f.fileName),
            publicId: f.publicId || '',
            resourceType: f.resourceType || 'auto',
          });
        } else {
          // File was removed by admin: delete from Cloudinary / disk
          await removeFile(f);
        }
      }
    } else if (shouldRemoveFile === 'true' || shouldRemoveFile === true) {
      // Remove all previous files
      if (Array.isArray(existing.files)) {
        for (const f of existing.files) {
          await removeFile(f);
        }
      }
      if (existing.formUrl) await removeFile(existing.formUrl);
      keptFiles = [];
    } else {
      // Default: retain existing files
      keptFiles = Array.isArray(existing.files) && existing.files.length > 0
        ? existing.files
        : (existing.formUrl ? [{ fileUrl: existing.formUrl, fileName: existing.formName, displayName: existing.formName, fileSize: existing.formSize, fileType: getFileType(existing.formName) }] : []);
    }

    // Collect new uploaded files
    const newlyUploaded = [];
    if (req.files) {
      if (Array.isArray(req.files.files)) {
        newlyUploaded.push(...req.files.files);
      }
      if (Array.isArray(req.files.pdf)) {
        newlyUploaded.push(...req.files.pdf);
      }
    }

    // Check maximum limit of 5 files total (kept + new)
    if (keptFiles.length + newlyUploaded.length > MAX_ANNOUNCEMENT_FILES) {
      return res.status(400).json({
        message: `Maximum ${MAX_ANNOUNCEMENT_FILES} files (PDF & Excel) allowed per announcement. Currently kept: ${keptFiles.length}, New: ${newlyUploaded.length}.`
      });
    }

    // Upload new files to Cloudinary and delete from local backend disk
    const formattedNewFiles = [];
    for (let i = 0; i < newlyUploaded.length; i++) {
      const file = newlyUploaded[i];
      const matchedDetail = parsedFileDetails.find(d => d.fileName === file.originalname) || parsedFileDetails[i] || {};
      const displayName = (matchedDetail.displayName || '').trim();

      try {
        const cloudResult = await uploadFileToCloudinary(file.path, 'ginera-announcements');
        formattedNewFiles.push({
          fileUrl: cloudResult.fileUrl,
          fileName: file.originalname,
          displayName: displayName || file.originalname,
          fileSize: file.size,
          fileType: getFileType(file.originalname),
          publicId: cloudResult.publicId,
          resourceType: cloudResult.resourceType,
        });
      } catch (uploadErr) {
        console.error('Failed to upload file to Cloudinary:', uploadErr);
        formattedNewFiles.push({
          fileUrl: `/uploads/${file.filename}`,
          fileName: file.originalname,
          displayName: displayName || file.originalname,
          fileSize: file.size,
          fileType: getFileType(file.originalname),
          publicId: '',
          resourceType: 'auto',
        });
      }
    }

    const finalFiles = [...keptFiles, ...formattedNewFiles];
    existing.files = finalFiles;

    if (finalFiles.length > 0) {
      existing.formUrl = finalFiles[0].fileUrl;
      existing.formName = finalFiles[0].displayName || finalFiles[0].fileName;
      existing.formSize = finalFiles[0].fileSize;
    } else {
      existing.formUrl = '';
      existing.formName = '';
      existing.formSize = 0;
    }

    await existing.save();
    res.json(existing);
  } catch (err) {
    console.error('Error updating announcement:', err);
    res.status(500).json({ message: err.message || 'Error updating announcement' });
  }
};

// DELETE /api/announcements/:id
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Announcement.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Delete all attached files from Cloudinary and disk
    if (Array.isArray(existing.files)) {
      for (const f of existing.files) {
        await removeFile(f);
      }
    }
    if (existing.formUrl) {
      await removeFile(existing.formUrl);
    }

    await Announcement.findByIdAndDelete(id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ message: 'Error deleting announcement' });
  }
};
