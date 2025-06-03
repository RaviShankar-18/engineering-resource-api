const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["engineer", "manager"],
      required: true,
    },
    // Engineer specific fields
    skills: [
      {
        type: String,
      },
    ],
    seniority: {
      type: String,
      enum: ["junior", "mid", "senior"],
    },
    maxCapacity: {
      type: Number,
      default: 100, // 100 for full-time, 50 for part-time
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
