const Announcement = require('../models/Announcement');
const fs = require('fs');
const path = require('path');

// Helper to remove uploaded file
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

// GET /api/announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const announcements = await Announcement.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(announcements);
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

    const announcementData = {
      title: title || 'Admission Announcements Will Be Available Soon',
      subtitle: subtitle || 'Official announcements, notices, and admission circulars for Government College of Nursing, GINERA.',
      badge: badge || 'Will Be Updated Soon',
      description: description || '',
      points: parsedPoints,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true,
      order: order ? Number(order) : 0,
    };

    if (req.file) {
      announcementData.formUrl = `/uploads/${req.file.filename}`;
      announcementData.formName = req.file.originalname;
      announcementData.formSize = req.file.size;
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

    const { title, subtitle, badge, description, points, isActive, order, removeFile: shouldRemoveFile } = req.body;

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

    // Handle file update or removal
    if (req.file) {
      if (existing.formUrl) removeFile(existing.formUrl);
      existing.formUrl = `/uploads/${req.file.filename}`;
      existing.formName = req.file.originalname;
      existing.formSize = req.file.size;
    } else if (shouldRemoveFile === 'true' || shouldRemoveFile === true) {
      if (existing.formUrl) removeFile(existing.formUrl);
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
