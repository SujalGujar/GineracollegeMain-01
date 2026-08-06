const mongoose = require('mongoose');

const sectionVisibilitySchema = new mongoose.Schema({
  sectionKey: { type: String, required: true, unique: true },
  page: { type: String, required: true },
  sectionName: { type: String, required: true },
  description: { type: String },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SectionVisibility', sectionVisibilitySchema);
