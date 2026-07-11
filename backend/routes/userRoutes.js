const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get user by ID
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/profile/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      {
        new: true
      }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;