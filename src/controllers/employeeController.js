const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
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
};

exports.addEmployee = async (req, res) => {
  try {
    const newEmp = await Employee.create(req.body);
    res.json(newEmp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
