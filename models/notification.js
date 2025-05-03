const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userRole: {
      type: String,
      enum: ["home-owner", "gardener", "admin", "supervisor"],
      required: true
    },
    type: {
      type: String,
      enum: ["success", "error", "info"],
      default: "info"
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  });

  module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
  