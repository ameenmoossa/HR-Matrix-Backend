
const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  date: {
    type: String,   // "2025-11-25"
    required: true
  },
  day: {
    type: String,   // "Mon"
    required: true
  },
  checkIn: {
    type: String,
    default: "-"
  },
  checkOut: {
    type: String,
    default: "-"
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "In Office"],
    default: "Present"
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);















































