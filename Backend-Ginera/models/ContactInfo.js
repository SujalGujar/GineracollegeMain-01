const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  address: { type: String },
  receptionPhone: { type: String },
  ambulancePhone: { type: String },
  generalEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
