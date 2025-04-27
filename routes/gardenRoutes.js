const express = require('express');

const {
    addPlant,
    getAllPlants,
    deletePlant
} = require("../controllers/gardenController");

const router = express.Router();

router.post('/addPlant/:userId', addPlant);
router.get('/getPlants/all/:userId', getAllPlants);
router.delete('/deletePlant/:userId/:plantId', deletePlant);

module.exports = router