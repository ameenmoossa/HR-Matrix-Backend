const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

/* ---------------------------------------
   GET ALL EMPLOYEES (with search filter)
---------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { fullName: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { role: new RegExp(search, "i") },
          { department: new RegExp(search, "i") },
        ],
      };
    }

    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------
   ADD NEW EMPLOYEE
---------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const newEmp = await Employee.create(req.body);
    res.json(newEmp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------
   UPDATE EMPLOYEE  ⭐ FIXES EDIT BUTTON
---------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------------------
   DELETE EMPLOYEE
---------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;













