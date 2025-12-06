const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Resume = require("../models/Resume");

exports.getDashboardStats = async (req, res) => {
  try {
    /* ------------------------------------
       1️⃣ TOTAL EMPLOYEES
    ------------------------------------- */
    const totalEmployees = await Employee.countDocuments();

    /* ------------------------------------
       2️⃣ TODAY'S ATTENDANCE
       FIX: Convert date string to real sortable date
    ------------------------------------- */

    // Get ALL attendance dates and find the latest REAL date 
    const allDates = await Attendance.find().distinct("date");

    let todayDate = null;

    if (allDates.length > 0) {
      todayDate = allDates.sort((a, b) => new Date(b) - new Date(a))[0];
    }

    // If no attendance exists yet
    if (!todayDate) {
      return res.json({
        totalEmployees,
        presentToday: 0,
        attendancePercentage: 0,
        pendingLeaves: await Leave.countDocuments({ status: "pending" }),
        totalMatches: await Resume.countDocuments()
      });
    }

    // Present = Present + Late + In Office
    const presentToday = await Attendance.countDocuments({
      date: todayDate,
      status: { $in: ["Present", "Late", "In Office"] }
    });

    const attendancePercentage =
      totalEmployees > 0
        ? Math.round((presentToday / totalEmployees) * 100)
        : 0;

    /* ------------------------------------
       3️⃣ PENDING LEAVES
    ------------------------------------- */
    const pendingLeaves = await Leave.countDocuments({ status: "pending" });

    /* ------------------------------------
       4️⃣ AI RESUME MATCH COUNT
    ------------------------------------- */
    const totalMatches = await Resume.countDocuments();

    /* ------------------------------------
       SEND RESPONSE
    ------------------------------------- */
    res.json({
      totalEmployees,
      presentToday,
      attendancePercentage,
      pendingLeaves,
      totalMatches,
    });

  } catch (err) {
    console.log("Dashboard Stats Error:", err);
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};
