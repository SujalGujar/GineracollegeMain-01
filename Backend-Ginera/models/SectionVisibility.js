const mongoose = require('mongoose');

const sectionVisibilitySchema = new mongoose.Schema({
  sectionKey: { type: String, required: true, unique: true },
  page: { type: String, required: true },
  sectionName: { type: String, required: true },
  description: { type: String },
  departmentSlug: { type: String, default: null },
  departmentName: { type: String, default: null },
  subSection: { type: String, default: null }, // 'page', 'overview', 'facilities', 'faculty', 'activities'
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

sectionVisibilitySchema.index({ page: 1, isVisible: 1 });
sectionVisibilitySchema.index({ departmentSlug: 1 });

module.exports = mongoose.model('SectionVisibility', sectionVisibilitySchema);
