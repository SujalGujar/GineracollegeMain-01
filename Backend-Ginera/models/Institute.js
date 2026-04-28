const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  description2: { type: String },
  description3: { type: String },
  established: { type: String },
  capacity: { type: String },
  specialties: [{ type: String }],
  services: [{ type: String }],
  contact: {
    address: { type: String },
    phone: { type: String },
    website: { type: String }
  },
  icon: { type: String, default: '🏥' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Institute', instituteSchema);
