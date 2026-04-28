const mongoose = require('mongoose');

const admissionStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  details: { type: String, default: '' },
  detailsUrl: { type: String, default: '' },
  icon: { type: String, default: '📋' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('AdmissionStep', admissionStepSchema);
