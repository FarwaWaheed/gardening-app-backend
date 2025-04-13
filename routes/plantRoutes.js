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

router.post('/add', addPlant);
router.get('/all', getAllPlants);
router.get('/:id', getPlantById);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);
router.get('/search', searchPlants);
router.get('/category/:category', getPlantsByCategory);
router.post('/suggestions', suggestPlants);

module.exports = router;

