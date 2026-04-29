const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    default: 'Nursing Department'
  },
  description: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: false
  },
  overview2: {
    type: String,
    required: false
  },
  faculty: [{
    name: String,
    designation: String,
    qualification: String,
    specialization: String
  }],
  facilities: [{
    type: String
  }],
  activities: [{
    type: String
  }],
  logoUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Department', departmentSchema);
