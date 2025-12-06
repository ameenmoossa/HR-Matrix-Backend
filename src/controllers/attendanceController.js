const asyncHandler = require('../utils/asyncHandler');
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

/* -----------------------------------------------------
   1️⃣ AUTO-CREATE ATTENDANCE FOR TODAY
------------------------------------------------------ */
async function syncTodayAttendance() {
  const today = new Date().toISOString().split("T")[0];

  const employees = await Employee.find();

  for (const emp of employees) {
    const exists = await Attendance.findOne({
      employee: emp._id,
      date: today,
    });

    if (!exists) {
      await Attendance.create({
        employee: emp._id,
        date: today,
        day: new Date().toLocaleString("en-US", { weekday: "short" }),
        checkIn: "-",
        checkOut: "-",
        status: "Present", // default
      });
    }
  }
}

/* -----------------------------------------------------
   2️⃣ GET ALL ATTENDANCE (LIVE DATA)
------------------------------------------------------ */
const listAttendance = asyncHandler(async (req, res) => {
  await syncTodayAttendance(); // make sure everyone appears

  const today = new Date().toISOString().split("T")[0];

  // COUNT STATISTICS
  const presentToday = await Attendance.countDocuments({
    date: today,
    status: { $in: ["Present", "Late", "In Office"] },
  });

  const absentToday = await Attendance.countDocuments({
    date: today,
    status: "Absent",
  });

  const lateArrivals = await Attendance.countDocuments({
    date: today,
    status: "Late",
  });

  const totalEmployees = await Employee.countDocuments();
  const attendanceRate =
    totalEmployees > 0
      ? Math.round((presentToday / totalEmployees) * 100)
      : 0;

  // RECENT LIST
  const recent = await Attendance.find({ date: today })
    .populate("employee", "fullName")
    .sort({ createdAt: -1 });

  const formattedRecent = recent.map((a) => ({
    _id: a._id,            // ✅ ADDED SO FRONTEND CAN UPDATE STATUS
    id: a._id,             // (Optional but useful)
    date: a.date,
    day: a.day,
    name: a.employee?.fullName || "Unknown",
    checkIn: a.checkIn,
    checkOut: a.checkOut,
    status: a.status,
  }));

  return res.json({
    presentToday,
    absentToday,
    lateArrivals,
    attendanceRate,
    totalEmployees,
    recent: formattedRecent,
  });
});

/* -----------------------------------------------------
   3️⃣ UPDATE LOG ATTENDANCE (existing)
------------------------------------------------------ */
const logAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, checkIn, checkOut } = req.body;

  const updated = await Attendance.findByIdAndUpdate(
    id,
    { status, checkIn, checkOut },
    { new: true }
  ).populate("employee", "fullName");

  res.json({ message: "Attendance updated", data: updated });
});

/* -----------------------------------------------------
   4️⃣ NEW — UPDATE STATUS ONLY (Present / Absent / Late)
------------------------------------------------------ */
const updateAttendanceStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["Present", "Absent", "Late", "In Office"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const updated = await Attendance.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  res.json({ message: "Status updated", data: updated });
});

module.exports = {
  listAttendance,
  logAttendance,
  updateAttendanceStatus
};






















































































