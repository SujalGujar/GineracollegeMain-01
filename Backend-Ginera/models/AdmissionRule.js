const mongoose = require('mongoose');

const admissionRuleSchema = new mongoose.Schema({
  category: { type: String, required: true },  // e.g. "General Rules", "Eligibility"
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '📌' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('AdmissionRule', admissionRuleSchema);
