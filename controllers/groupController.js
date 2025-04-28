const Group = require("../models/Group");
require ("../models/user");


//  Create a new group
const createGroup = async (req, res) => {
  try {
    const { members, ...groupData } = req.body;

    const group = new Group({
      ...groupData,
      createdBy: req.user.id,
      members: members && members.length > 0 ? members : [req.user.id],
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
    const groups = await Group.find(filter).populate("createdBy members", "name");
    console.log(groups);
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get a specific group
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("createdBy members", "name");
    console.log (group);
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

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    // find the group first
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }
    await Group.findByIdAndDelete(id);

    res.status(200).json({ message: "Group deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting group", error: err.message });
  }
};


const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // update the group with new data
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
  } catch (err) {
    res.status(500).json({ message: "Error updating group", error: err.message });
  }
};


module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  deleteGroup,
  updateGroup,
};
