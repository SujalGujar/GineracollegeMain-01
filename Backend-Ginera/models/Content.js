const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  title: { type: String },
  description1: { type: String },
  description2: { type: String }
});

module.exports = mongoose.model('Content', contentSchema);
