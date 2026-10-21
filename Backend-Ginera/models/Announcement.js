const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Admission Announcements Will Be Available Soon'
  },
  subtitle: {
    type: String,
    default: 'Official announcements, notices, and admission circulars for Government College of Nursing, GINERA.'
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

module.exports = mongoose.model('Announcement', announcementSchema);
