const plantRecord = require('../models/plantRecords');

const addPlantRecord = async (req,res) => {
    try{
        const userId = req.params.userId;
        const plantId = req.params.plantId;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const { height, observationNote} = req.body;
        if(!height){
            return res.status(200).json({message: "Please enter height of plant"});

        }
        if(!observationNote){
            return res.status(200).json({message: "Please enter observations about plant"});

        }
        const plantDetail = new plantRecord({
            userId,
            plantId,
            height,
            observationNote,
            imageUrl,
        });
        const savedPlant = await plantDetail.save();
        return res.status(201).json({ message: 'Plant record created successfully', savedPlant});
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding plant record', error: error.message });
    }
}

const updatePlantRecord = async (req,res) => {
    try{
        const userId = req.params.userId;
        const plantId = req.params.plantId;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const { height, observationNote} = req.body;
        if(!height){
            return res.status.json({message: "Please enter height of plant"});

        }
        if(!observationNote){
            return res.status.json({message: "Please enter observations about plant"});

        }
        const updatedRecord = await plantRecord.findOneAndUpdate(
            {userId: userId, plantId: plantId},
            {height, observationNote, imageUrl},
            {new: true})
        if (!updatedRecord) {
            return res.status(200).json({ message: 'Plant record not found' });
        }
        return res.status(200).json({ message: 'Plant record updated successfully', updatedRecord});
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding plant record', error: error.message });
    }
}
const getAllPlantRecords = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plantId = req.params.plantId;
        const records = await plantRecord.find({userId: userId, plantId: plantId}).sort({date: -1});
        if (records.length === 0) {
            return res.status(200).json({
                plantRecords: [],
            });
        }
        return res.status(200).json({
            plantRecords:records,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant records', error: error.message });
    }
};

const getPlantRecord = async (req, res) => {
    try {
        const plantRecordId = req.params.recordId;
        const record = await plantRecord.findById(plantRecordId);
        if (!record) {
            return res.status(404).json({message: "Plant record not found!"})
        }
        return res.status(200).json({
            plantRecord: record,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant record', error: error.message });
    }
};


const deletePlantRecord = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plantId = req.params.plantId;
        const deleted = await plantRecord.findOneAndDelete({userId: userId, plantId: plantId});
        if (!deleted) return res.status(404).json({ message: 'Plant record not found' });
        res.status(200).json({ message: 'Plant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plant record', error: error.message });
    }
};
module.exports = {
    addPlantRecord,
    getAllPlantRecords,
    getPlantRecord,
    updatePlantRecord,
    deletePlantRecord,
}