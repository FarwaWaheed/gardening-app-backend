const express = require('express');
const router = express.Router();
const {signUp, logIn, updateUser, getUserById, getAllUsers, deleteUser} = require("../controllers/userController");

const { isAuthenticated } = require("../middleware/authenticated"); 
const { authorizeRoles } = require("../middleware/roleMiddleware.js");

router.post("/signUp", signUp);
router.post("/logIn", logIn);

router.post("/updateUser/:id", isAuthenticated, updateUser);
router.get("/get/:id", isAuthenticated, getUserById);
router.get("/getAll",isAuthenticated,  getAllUsers);
router.delete("/deleteUser/:id", isAuthenticated, authorizeRoles("admin") , deleteUser);

module.exports = router;