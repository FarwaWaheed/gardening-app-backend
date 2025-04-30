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
// 🔐 Hash the password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // only hash if changed/new
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
module.exports = mongoose.models.User || mongoose.model('User', userSchema);