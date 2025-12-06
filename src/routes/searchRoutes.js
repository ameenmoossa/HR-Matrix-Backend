const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q.trim()) return res.json([]);

    const regex = new RegExp(q, "i");

    // 🔹 EMPLOYEES (MATCH YOUR MODEL FIELDS)
    const employees = await Employee.find({
      $or: [
        { fullName: regex },     // ✔ your model field
        { email: regex },        // ✔ your model field
        { role: regex },         // ✔ your model field
        { department: regex },   // ✔ your model field
      ],
    })
      .select("fullName email role department")
      .lean();

    const results = [
      ...employees.map((emp) => ({
        _id: emp._id,
        type: "Employee",
        name: emp.fullName,  // ✔ correct field
        extra: emp.role || emp.department || emp.email || "", // ✔ show something useful
      })),
    ];

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
