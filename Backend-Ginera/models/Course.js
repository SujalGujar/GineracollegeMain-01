const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  category: { type: String, required: true },  // e.g. "Undergraduate Programs"
  icon: { type: String, default: '🎓' },
  name: { type: String, required: true },
  duration: { type: String, default: '' },
  seats: { type: String, default: '' },
  eligibility: { type: String, default: '' },
  description: { type: String, default: '' },
  fees: { type: String, default: '' },
  admission: { type: String, default: '' },
  websiteLink: { type: String, default: '' },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
