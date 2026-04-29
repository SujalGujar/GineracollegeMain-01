const mongoose = require('mongoose');

const contactKeyPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  qualification: { type: String },
  phone: { type: String },
  email: { type: String },
  hours: { type: String },
  icon: { type: String },
  color: { type: String },
  responsibilities: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('ContactKeyPerson', contactKeyPersonSchema);
