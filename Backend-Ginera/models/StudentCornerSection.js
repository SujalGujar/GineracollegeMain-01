const mongoose = require('mongoose');

const studentCornerSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  tag: { type: String, default: '' },
  icon: { type: String, default: '📄' },
  color: { type: String, default: '#F59E0B' },
  borderColor: { type: String, default: '#FCD34D' },
  badgeColor: { type: String, default: '#D97706' },
  items: [{ type: String }],
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('StudentCornerSection', studentCornerSectionSchema);
