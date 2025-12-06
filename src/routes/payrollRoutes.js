const express = require("express");
const router = express.Router();

const {
  processPayroll,
  getPayroll,
  updatePayroll
} = require("../controllers/payrollController");

router.post("/process", processPayroll);
router.get("/", getPayroll);
router.patch("/:id", updatePayroll);

module.exports = router;
