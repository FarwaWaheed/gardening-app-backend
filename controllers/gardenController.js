const garden = require('../models/userPlants');
const plantModel = require('../models/plant')
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
        let plantArray = [];
        userPlants.forEach(func1);
        async function func1(userPlant) {
            const plantId = userPlant.plantId;
            const plant = await plantModel.findById(plantId);
            plantArray.push(plant);

        }
        return res.status(200).json(plantArray);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plants', error: error.message });
    }
};


const deletePlant = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plantId = req.body.plantId;
        const plant = await garden.find({userId: userId, plantId: plantId});
        const deleted = await garden.findByIdAndDelete(plant.id);
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