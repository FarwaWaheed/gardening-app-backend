const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPlants = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    plantId: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
    },
});

module.exports = mongoose.models.UserPlants || mongoose.model('UserPlants', userPlants);