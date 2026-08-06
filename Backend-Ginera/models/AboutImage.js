const mongoose = require('mongoose');

const aboutImageSchema = new mongoose.Schema({
  key: {
    type: String,
    enum: ['missionValues', 'visionGoals', 'visionMain', 'missionMain', 'historyHero', 'historyTimeline', 'historyLegacy'],
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('AboutImage', aboutImageSchema);
