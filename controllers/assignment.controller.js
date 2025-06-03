const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("engineerId", "name email skills")
      .populate("projectId", "name description");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createAssignment = async (req, res) => {
  try {
    const {
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    } = req.body;

    // Check if engineer has enough capacity
    const engineer = await User.findById(engineerId);
    const currentDate = new Date();
    const overlappingAssignments = await Assignment.find({
      engineerId,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    const totalAllocated = overlappingAssignments.reduce(
      (sum, assignment) => sum + assignment.allocationPercentage,
      0
    );

    if (totalAllocated + allocationPercentage > engineer.maxCapacity) {
      return res.status(400).json({
        message: "Engineer does not have enough available capacity",
        available: engineer.maxCapacity - totalAllocated,
        requested: allocationPercentage,
      });
    }

    const assignment = new Assignment({
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    });

    await assignment.save();
    await assignment.populate("engineerId", "name email");
    await assignment.populate("projectId", "name description");

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("engineerId", "name email")
      .populate("projectId", "name description");

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
