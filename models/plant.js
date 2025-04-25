const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: String,
  category: { type: String, enum: ['vegetable', 'fruit', 'flower'] },
  climate: String,
  soil: String,
  sunlight: String,
  wateringFrequency: String,
  growthType: String,
  description: String,
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.models.Plant || mongoose.model('Plants', plantSchema);
