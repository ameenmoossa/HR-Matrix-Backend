// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // MIDDLEWARE
// app.use(cors());
// app.use(express.json());

// // CONNECT MONGO
// mongoose
//   .connect(process.env.MONGO_URI, { dbName: "smarthr" })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("DB Error:", err));

// // ✅ ALL ROUTES (ONLY ONCE — CLEAN & CORRECT)
// app.use("/api/employees", require("./routes/employeeRoutes"));
// app.use("/api/attendance", require("./routes/attendanceRoutes"));
// app.use("/api/leave", require("./routes/leaveRoutes"));
// app.use("/api/resumes", require("./routes/resumeRoutes")); // only ONCE
// app.use("/api/payroll", require("./routes/payrollRoutes"));
// app.use("/api/activity", require("./routes/activityRoutes"));
// app.use("/uploads", express.static("uploads"));
// app.use("/api/dashboard", require("./routes/dashboardRoutes"));



// // ROOT TEST
// app.get("/", (req, res) => {
//   res.send("HR Matrix Backend Running...");
// });

// // ERROR HANDLER (must be LAST)
// app.use((err, req, res, next) => {
//   console.error("SERVER ERROR:", err);
//   res.status(500).json({ error: err.message });
// });

// // START SERVER
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















































const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// CONNECT MONGO
mongoose
  .connect(process.env.MONGO_URI, { dbName: "smarthr" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ✅ ALL ROUTES (ONLY ONCE — CLEAN & CORRECT)
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/leave", require("./routes/leaveRoutes"));
app.use("/api/resumes", require("./routes/resumeRoutes")); // only ONCE
app.use("/api/payroll", require("./routes/payrollRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ⭐⭐⭐ ADD THIS (GLOBAL SEARCH ROUTE)
app.use("/api/search", require("./routes/searchRoutes"));  // <-- ONLY NEW LINE


// ROOT TEST
app.get("/", (req, res) => {
  res.send("SmartHR Backend Running...");
});

// ERROR HANDLER (must be LAST)
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
















