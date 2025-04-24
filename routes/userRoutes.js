const express = require('express');
const router = express.Router();
const {signUp, logIn, updateUser} = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/updateUser/:id", updateUser);

module.exports = router