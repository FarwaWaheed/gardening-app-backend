const express = require("express");
const {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
} = require("../controllers/groupController");
const { isAuthenticated } = require("../middleware/authenticated");

const router = express.Router();

router.post("/", isAuthenticated, createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.post("/:id/join", isAuthenticated, joinGroup);
router.post("/:id/leave", isAuthenticated, leaveGroup);

module.exports = router;
