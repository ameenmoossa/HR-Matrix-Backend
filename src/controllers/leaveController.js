const Leave = require("../models/Leave");

/* APPLY LEAVE */
exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      status: "pending",
    });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ⭐ GET ALL LEAVES (Pending + Approved + Rejected) */
exports.getAllLeaves = async (_req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


      exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId")
      .sort({ startDate: 1 });

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




/* APPROVE LEAVE */
exports.approveLeave = async (req, res) => {
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
};

/* REJECT LEAVE */
exports.rejectLeave = async (req, res) => {
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
};

























