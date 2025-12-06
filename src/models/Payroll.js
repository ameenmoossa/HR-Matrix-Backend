const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    month: {
      type: Number,
      required: true
    },

    basePay: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Processed", "Pending"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", PayrollSchema);


















