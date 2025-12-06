const express = require("express");
const {
  listAttendance,
  logAttendance,
  updateAttendanceStatus
} = require("../controllers/attendanceController");

const router = express.Router();

/* ---------------------------
   GET ALL ATTENDANCE
---------------------------- */
router.get("/", listAttendance);

/* ---------------------------
   UPDATE STATUS ONLY
   (Present / Absent / Late)
---------------------------- */
router.post("/:id/status", updateAttendanceStatus);

/* ---------------------------
   UPDATE FULL RECORD
   (checkIn, checkOut, status)
---------------------------- */
router.post("/:id", logAttendance);

module.exports = router;
