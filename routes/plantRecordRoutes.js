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
router.get('/getPlantRecords/all/:userId/:plantId',upload.single('image'), getAllPlantRecords);
router.get('/getPlantRecord/all/:recordId', getPlantRecord);
router.put('/updatePlantRecords/:userId/:plantId', updatePlantRecord);
router.delete('/deletePlantRecord/:userId/:plantId', deletePlantRecord);

module.exports = router