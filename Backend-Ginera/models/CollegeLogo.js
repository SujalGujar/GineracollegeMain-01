const mongoose = require('mongoose');

const collegeLogo = new mongoose.Schema({
  logoUrl: { type: String, default: '' },
  collegeName: { type: String, default: 'Government College of Nursing, GINERA' },
  tagline: { type: String, default: 'Excellence in Nursing Education' }
}, { timestamps: true });

module.exports = mongoose.model('CollegeLogo', collegeLogo);
