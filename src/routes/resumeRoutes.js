const express = require("express");
const router = express.Router();

const { addResume } = require("../controllers/resumeController");

router.post("/add", addResume);

module.exports = router;
