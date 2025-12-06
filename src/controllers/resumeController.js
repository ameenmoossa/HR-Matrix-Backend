const Resume = require("../models/Resume");

exports.addResume = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.json(resume);
  } catch (err) {
    console.error("Add Resume Error:", err);
    res.status(500).json({ message: "Failed to save resume" });
  }
};


