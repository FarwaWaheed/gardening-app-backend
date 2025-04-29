const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String, // could also be { type: { type: String }, coordinates: [Number] } for GeoJSON
  interestTags: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Group || mongoose.model('Groups', groupSchema);
