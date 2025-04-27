const garden = require('../models/userPlants');
const plantModel = require('../models/Plant')
const addPlant = async (req,res) => {
    try{
        const userId = req.params.userId;
        const plantId = req.body.plantId;
        const userPlant = new garden({userId ,plantId});
        const savedPlant = await userPlant.save();
        return res.status(201).json({ message: 'Plant added successfully', savedPlant});
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding plant', error: error.message });
    }
}

const getAllPlants = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPlants = await garden.find({userId: userId});
        if (userPlants.length === 0) {
            return res.status(200).json({
                plants: [],
            });
        }
        const plantArray = await Promise.all(
            userPlants.map(userPlant => plantModel.findById(userPlant.plantId))
        );
        return res.status(200).json({
            plants: plantArray,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plants', error: error.message });
    }
};


const deletePlant = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plantId = req.body.plantId;
        const deleted = await garden.findOneAndDelete({userId: userId, plantId: plantId});
        if (!deleted) return res.status(404).json({ message: 'Plant not found' });
        res.status(200).json({ message: 'Plant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plant', error: error.message });
    }
};
module.exports = {
    addPlant,
    getAllPlants,
    deletePlant
}