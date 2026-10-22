const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Admission Announcements Will Be Available Soon'
  },
  subtitle: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: 'Will Be Updated Soon'
  },
  description: {
    type: String,
    default: 'The official admission notices, circulars, and schedules for Post Basic Diploma Course in Nursing at Government / GMERS Medical / Nursing College (Government College of Nursing, GINERA, Ahmedabad) will be published here.'
  },
  points: [{
    type: String
  }],
  // Multi-file support: Multiple PDFs and Excel sheets (.pdf, .xlsx, .xls, .csv)
  files: [{
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    fileType: { type: String, enum: ['pdf', 'excel', 'other'], default: 'pdf' }
  }],
  // Backward compatibility fields for single-file legacy references
  formUrl: {
    type: String,
    default: ''
  },
  formName: {
    type: String,
    default: ''
  },
  formSize: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Auto-sync legacy single-file fields with the first attached file if present
announcementSchema.pre('save', function(next) {
  if (Array.isArray(this.files) && this.files.length > 0) {
    this.formUrl = this.files[0].fileUrl;
    this.formName = this.files[0].fileName;
    this.formSize = this.files[0].fileSize;
  }
  next();
});

module.exports = mongoose.model('Announcement', announcementSchema);
