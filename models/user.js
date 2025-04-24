const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['home-owner', 'gardener', 'supervisor', 'admin'],
        default: 'home-owner'
    },
})

module.exports = mongoose.model('User', userSchema);