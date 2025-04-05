// routes/plantRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPlants } = require('../controllers/plantController');

router.get('/plants', getAllPlants);

module.exports = router;
