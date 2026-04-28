const mongoose = require('mongoose');

const bondSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['student', 'service'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'text-amber-600'
  },
  bgColor: {
    type: String,
    default: 'from-amber-500 to-orange-500'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Bond', bondSchema);
