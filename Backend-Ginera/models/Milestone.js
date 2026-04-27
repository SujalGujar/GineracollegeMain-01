const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  year: { type: String, required: true },
  event: { type: String, required: true },
  icon: { type: String, default: '🎯' },
  color: { type: String, default: '#1e3a8a' },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
