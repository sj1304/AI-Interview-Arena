const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");

router.get("/history/:userId", async (req, res) => {
  const interviews = await Interview.find({
    userId: req.params.userId
  });

  res.json(interviews);
});
module.exports = router;