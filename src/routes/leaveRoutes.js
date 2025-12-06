





















const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

/* APPLY LEAVE */
router.post("/", async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      status: "pending",
    });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ⭐ GET ALL LEAVES (for View All) */
// router.get("/", async (req, res) => {
//   try {
//     const leaves = await Leave.find().populate("employeeId");
//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
  /* GET ALL LEAVES (for Upcoming Leaves section) */
router.get("/all", async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId")
      .sort({ startDate: 1 });

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* GET PENDING LEAVES */
router.get("/pending", async (_req, res) => {
  try {
    const leaves = await Leave.find({ status: "pending" }).populate("employeeId");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* APPROVE LEAVE */
router.patch("/:id/approve", async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).populate("employeeId");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* REJECT LEAVE */
router.patch("/:id/reject", async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).populate("employeeId");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;










