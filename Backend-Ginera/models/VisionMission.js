const mongoose = require('mongoose');

const visionMissionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['vision', 'mission'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('VisionMission', visionMissionSchema);
