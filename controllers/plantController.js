const Plant = require('../models/Plant');

const addPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json({ message: 'Plant added successfully', plant });
  } catch (error) {
    res.status(500).json({ message: 'Error adding plant', error: error.message });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plants', error: error.message });
  }
};

const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving plant', error: error.message });
  }
};

const updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json({ message: 'Plant updated successfully', updatedPlant });
  } catch (error) {
    res.status(500).json({ message: 'Error updating plant', error: error.message });
  }
};

const deletePlant = async (req, res) => {
  try {
    const deleted = await Plant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plant', error: error.message });
  }
};

const searchPlants = async (req, res) => {
  const { query } = req.query;
  const pluralSafeQuery = query.replace(/s$/, ""); // basic singular conversion

  try {
    const plants = await Plant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { scientificName: { $regex: query, $options: 'i' } },
        { category: { $regex: new RegExp(`^${pluralSafeQuery}$`, 'i') } }
      ]
    });
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error searching plants', error: error.message });
  }
};


const getPlantsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const allowedCategories = ['fruit', 'vegetable', 'flower'];
    if (!allowedCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const plants = await Plant.find({ category: category.toLowerCase() });
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plants by category', error: error.message });
  }
};

const suggestPlants = async (req, res) => {
  const { climate, soil, sunlight } = req.body;

  try {
    const query = {};

    if (climate) {
      query.climate = { $regex: climate, $options: 'i' };
    }
    if (soil) {
      query.soil = { $regex: soil, $options: 'i' };
    }
    if (sunlight) {
      query.sunlight = { $regex: sunlight, $options: 'i' };
    }

    const suggestions = await Plant.find(query);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error suggesting plants', error: error.message });
  }
};


module.exports = {
  addPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
  searchPlants,
  getPlantsByCategory,
  suggestPlants
};
