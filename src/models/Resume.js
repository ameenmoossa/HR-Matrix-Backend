const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  experience: String,
  skills: [String],
  extractedText: String
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);

