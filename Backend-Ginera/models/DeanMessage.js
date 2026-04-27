const mongoose = require('mongoose');

const deanMessageSchema = new mongoose.Schema({
  name: { type: String, default: 'Dr. Hiral S. Shah' },
  title: { type: String, default: 'Principal' },
  greeting: { type: String, default: 'Dear Students, Faculty and Visitors,' },
  paragraphs: { type: [String], default: [] },
  highlight: { type: String, default: 'Together, let us continue to work towards our shared goal of creating a healthier world.' },
  photoUrl: { type: String, default: '' },
  stats: {
    type: [{
      number: String,
      label: String,
      color: String
    }],
    default: [
      { number: '62+', label: 'Years of Excellence', color: '#A2632E' },
      { number: '10,000+', label: 'Graduates', color: '#1e40af' },
      { number: '50+', label: 'Faculty Members', color: '#059669' },
      { number: '35+', label: 'Research Papers/Year', color: '#7c3aed' }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('DeanMessage', deanMessageSchema);
