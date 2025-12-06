const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, activity: "Logged in", time: "2025-11-30 10:25 AM" },
    { id: 2, activity: "Viewed Dashboard", time: "2025-11-30 10:27 AM" }
  ]);
});

module.exports = router;
