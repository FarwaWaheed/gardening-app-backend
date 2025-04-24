// routes/plantRoutes.js
// routes/plantRoutes.js

const express = require('express');

const {
    addPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant,
    searchPlants,
    getPlantsByCategory,
    suggestPlants
  } = require('../controllers/plantController');
  

const router = express.Router();

router.post('/addplant', addPlant);
router.get('/getplants/all', getAllPlants);
router.get('/getplant/:id', getPlantById);
router.put('/update/:id', updatePlant);
router.delete('/delete/:id', deletePlant);
router.get('/search', searchPlants);
router.get('/category/:category', getPlantsByCategory);
router.post('/suggestions', suggestPlants);

module.exports = router;

