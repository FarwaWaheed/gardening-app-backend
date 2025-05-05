const express = require('express');
const { addNotification, getUserNotifications, markAllAsRead, getAllNotifications } = require("../controllers/notificationController.js") ;

const router = express.Router();

router.post("/", addNotification);
router.get("/:userId", getUserNotifications);
router.put("/read/:userId", markAllAsRead);
router.get("/", getAllNotifications); // for admin & supervisor


module.exports = router;
