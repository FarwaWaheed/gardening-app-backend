const express = require("express");
const {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  deleteGroup,
  updateGroup
} = require("../controllers/groupController");
const { isAuthenticated } = require("../middleware/authenticated");
const {authorizeRoles} = require ("../middleware/roleMiddleware.js");

const router = express.Router();

router.post("/", isAuthenticated, createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.post("/:id/join", isAuthenticated, joinGroup);
router.post("/:id/leave", isAuthenticated, leaveGroup);

router.delete(
  "/:id", 
  isAuthenticated, 
  authorizeRoles("admin", "supervisor"),
  deleteGroup
);

router.put(
  "/:id/update", 
  isAuthenticated, 
  authorizeRoles("admin", "supervisor"),
  updateGroup
);



module.exports = router;
