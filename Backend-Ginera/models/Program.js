const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  imageUrls: [{
    type: String
  }],
  duration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Undergraduate', 'Postgraduate', 'Diploma'],
    default: 'Undergraduate'
  },
  courses: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Program', programSchema);
