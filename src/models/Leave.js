const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    reason: { type: String },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
