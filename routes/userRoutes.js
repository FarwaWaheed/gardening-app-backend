const express = require('express');
const router = express.Router();
const {signUp, signIn, updateUser} = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/updateUser/:id", updateUser);

module.exports = router