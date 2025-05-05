const Notification = require("../models/notification.js");

// Add a notification
const addNotification = async (req, res) => {
  try {
    const { userId, userRole, type, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "Missing userId or message" });
    }
    const newNotification = new Notification({ userId, userRole: userRole || "User", type, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark all as read
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.params.userId }, { read: true });
    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all notifications (for admin and supervisor)
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("userId", "name email role")
      .sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNotification,
  getUserNotifications,
  markAllAsRead,
  getAllNotifications
};
