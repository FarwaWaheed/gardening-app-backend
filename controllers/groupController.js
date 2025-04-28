const Group = require("../models/Group");

//  Create a new group
const createGroup = async (req, res) => {
  try {
    const group = new Group({
      ...req.body,
      createdBy: req.user.id,
      members: [req.user.id],
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Get all groups (optional filters)
const getGroups = async (req, res) => {
  const { location, tag } = req.query;
  let filter = {};
  if (location) filter.location = location;
  if (tag) filter.interestTags = tag;

  try {
    const groups = await Group.find(filter).populate("createdBy members", "username");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get a specific group
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("createdBy members", "username");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Join a group
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ message: "Already a member" });
    }

    group.members.push(req.user.id);
    await group.save();
    res.json({ message: "Joined group successfully", group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Leave a group
const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.members = group.members.filter(
      (memberId) => memberId.toString() !== req.user.id
    );
    await group.save();
    res.json({ message: "Left group successfully", group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
};
