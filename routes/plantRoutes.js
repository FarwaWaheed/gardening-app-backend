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

  const { authorizeRoles } = require("../middleware/roleMiddleware.js");
  

const router = express.Router();

router.post('/addplant', addPlant);
router.get('/getplants/all', getAllPlants);
router.get('/getplant/:id', getPlantById);
router.put('/update/:id',authorizeRoles("admin"), updatePlant);
router.delete('/delete/:id',authorizeRoles("admin"), deletePlant);
router.get('/search', searchPlants);
router.get('/category/:category', getPlantsByCategory);
router.post('/suggestions', suggestPlants);

module.exports = router;

