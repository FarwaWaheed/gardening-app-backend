const express = require('express');
const upload = require('../middleware/upload');
const {
    addPlantRecord,
    updatePlantRecord,
    getAllPlantRecords,
    getPlantRecord,
    deletePlantRecord
} = require("../controllers/plantRecordController");

const router = express.Router();

router.post('/addPlantRecord/:userId/:plantId', upload.single('image'), addPlantRecord);
router.get('/getPlantRecords/all/:userId/:plantId', getAllPlantRecords);
router.get('/getPlantRecord/:recordId', getPlantRecord);
router.put('/updatePlantRecord/:userId/:plantId',upload.single('image'), updatePlantRecord);
router.delete('/deletePlantRecord/:userId/:plantId', deletePlantRecord);

module.exports = router