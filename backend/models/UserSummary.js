const mongoose = require("mongoose");

const UserSummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  summary: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("UserSummary", UserSummarySchema);