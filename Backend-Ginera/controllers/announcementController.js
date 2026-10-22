const Announcement = require('../models/Announcement');
const fs = require('fs');
const path = require('path');

// Helper to remove an uploaded file from disk
const removeFile = (filePath) => {
  if (!filePath) return;
  try {
    const filename = path.basename(filePath);
    const fullPath = path.join(__dirname, '..', 'uploads', filename);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
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
          fileSize: item.formSize || 0,
          fileType: getFileType(item.formName || item.formUrl)
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
    const { title, subtitle, badge, description, points, isActive, order } = req.body;

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

    const formattedFiles = uploadedFiles.map(file => ({
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: getFileType(file.originalname)
    }));

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
      announcementData.formName = formattedFiles[0].fileName;
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
      retainedFiles
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

    // Determine which existing files are retained
    let keptFiles = [];
    if (retainedFiles) {
      let parsedRetained = [];
      try {
        parsedRetained = typeof retainedFiles === 'string' ? JSON.parse(retainedFiles) : retainedFiles;
      } catch (e) {
        parsedRetained = [];
      }

      // Keep only files whose fileUrl is in retained list
      const retainedUrls = new Set(parsedRetained.map(f => (typeof f === 'string' ? f : f.fileUrl)));
      
      const existingFileList = Array.isArray(existing.files) && existing.files.length > 0
        ? existing.files
        : (existing.formUrl ? [{ fileUrl: existing.formUrl, fileName: existing.formName, fileSize: existing.formSize, fileType: getFileType(existing.formName) }] : []);

      existingFileList.forEach(f => {
        if (retainedUrls.has(f.fileUrl)) {
          keptFiles.push(f);
        } else {
          // File was removed by admin: delete from disk
          removeFile(f.fileUrl);
        }
      });
    } else if (shouldRemoveFile === 'true' || shouldRemoveFile === true) {
      // Remove all previous files
      if (Array.isArray(existing.files)) {
        existing.files.forEach(f => removeFile(f.fileUrl));
      }
      if (existing.formUrl) removeFile(existing.formUrl);
      keptFiles = [];
    } else {
      // Default: retain existing files
      keptFiles = Array.isArray(existing.files) && existing.files.length > 0
        ? existing.files
        : (existing.formUrl ? [{ fileUrl: existing.formUrl, fileName: existing.formName, fileSize: existing.formSize, fileType: getFileType(existing.formName) }] : []);
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

    const formattedNewFiles = newlyUploaded.map(file => ({
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: getFileType(file.originalname)
    }));

    const finalFiles = [...keptFiles, ...formattedNewFiles];
    existing.files = finalFiles;

    if (finalFiles.length > 0) {
      existing.formUrl = finalFiles[0].fileUrl;
      existing.formName = finalFiles[0].fileName;
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

    // Delete all attached files from disk
    if (Array.isArray(existing.files)) {
      existing.files.forEach(f => removeFile(f.fileUrl));
    }
    if (existing.formUrl) {
      removeFile(existing.formUrl);
    }

    await Announcement.findByIdAndDelete(id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ message: 'Error deleting announcement' });
  }
};
