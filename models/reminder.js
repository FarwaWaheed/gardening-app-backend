const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    plantId : {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
    },
    date: {
        type: Date,
    },
    taskType: String, // 'watering', 'pruning', 'repotting'
    notes: String,
    isCompleted: Boolean
});

module.exports = mongoose.models.Reminder || mongoose.model('Reminders', reminderSchema);