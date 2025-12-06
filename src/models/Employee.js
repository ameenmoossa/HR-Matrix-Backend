const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      default: "",
    },

    salary: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active",
    },

    joinDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
