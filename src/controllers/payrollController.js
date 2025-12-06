const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");

/* -------------------------------------------------------
   PROCESS PAYROLL (creates salary entries automatically)
-------------------------------------------------------- */
exports.processPayroll = async (req, res) => {
  try {
    const { year, month } = req.body;

    //  Prevent duplicate records
    const exists = await Payroll.find({ year, month });
    if (exists.length > 0) {
      return res.json({
        message: "Payroll already generated for this month.",
        count: exists.length
      });
    }

    const employees = await Employee.find();

    const records = employees.map(emp => ({
      employee: emp._id,
      year,
      month,
      basePay: emp.salary,
      allowances: 1500,
      deductions: 800,
      bonus: 500,
      status: "Pending"
    }));

    await Payroll.insertMany(records);

    res.json({
      message: "Payroll processed successfully",
      count: records.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------------------------------------
   GET PAYROLL RECORDS
-------------------------------------------------------- */
exports.getPayroll = async (req, res) => {
  try {
    const { year, month } = req.query;

    const query = {};
    if (year) query.year = Number(year);
    if (month) query.month = Number(month);

    const rows = await Payroll.find(query).populate(
      "employee",
      "fullName role department"
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------------------------------------------------------
   UPDATE PAYROLL STATUS
-------------------------------------------------------- */
exports.updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Payroll.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    ).populate("employee");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






