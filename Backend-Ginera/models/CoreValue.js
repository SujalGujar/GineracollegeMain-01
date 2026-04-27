const mongoose = require('mongoose');

const coreValueSchema = new mongoose.Schema({
    icon: {
        type: String,
        default: '🌟'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'from-amber-500 to-orange-500'
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('CoreValue', coreValueSchema);
