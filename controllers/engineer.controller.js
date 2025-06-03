const User = require("../models/user.model");
const Assignment = require("../models/assignment.model");

const getAllEngineers = async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" }).select("-password");
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getEngineerCapacity = async (req, res) => {
  try {
    const { id } = req.params;

    const engineer = await User.findById(id);
    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    // Get active assignments
    const currentDate = new Date();
    const activeAssignments = await Assignment.find({
      engineerId: id,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    const totalAllocated = activeAssignments.reduce(
      (sum, assignment) => sum + assignment.allocationPercentage,
      0
    );

    const availableCapacity = engineer.maxCapacity - totalAllocated;

    res.json({
      engineerId: id,
      name: engineer.name,
      maxCapacity: engineer.maxCapacity,
      totalAllocated,
      availableCapacity,
      activeAssignments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllEngineers, getEngineerCapacity };
