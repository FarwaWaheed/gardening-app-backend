const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantRecordSchema = new mongoose.Schema({
    plantId : {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        //storing just the date not time
        default: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        }
    },
    height : Number,
    observationNote: String,
    imageUrl: String,
}, { timestamps: true });
//prevents duplicate entries for the same plant by the same user
plantRecordSchema.index({ plantId: 1, userId: 1, date: 1 }, { unique: true });
module.exports = mongoose.models.PlantRecord || mongoose.model('PlantRecord', plantRecordSchema);
