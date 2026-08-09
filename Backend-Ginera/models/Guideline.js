const mongoose = require('mongoose');

const guidelineSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['General Guidelines', 'Code of Conduct', 'Academic Requirements', 'For Parents/Guardians', 'Contact Information', 'Required Documents', 'Additional Documents']
    },
    subCategory: {
        type: String,
        default: ''
    },
    points: [{
        type: String,
        required: true
    }],
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Guideline', guidelineSchema);
