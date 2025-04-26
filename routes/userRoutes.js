const express = require('express');
const router = express.Router();
const {signUp, logIn, updateUser, getUserById, getAllUsers, deleteUser} = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/updateUser/:id", updateUser);
router.get("/get/:id", getUserById);
router.get("/getAll", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router