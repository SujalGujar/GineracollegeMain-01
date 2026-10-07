const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

sliderSchema.index({ department: 1, createdAt: -1 });

module.exports = mongoose.model('Slider', sliderSchema);
