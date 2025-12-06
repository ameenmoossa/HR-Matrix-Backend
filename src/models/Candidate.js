const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    skills: { type: [String], default: [] },
    experience: { type: String },
    resumeText: { type: String }, // extracted from PDF
    resumeFile: { type: String }, // filename of the uploaded PDF
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
