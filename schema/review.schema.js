const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  description: { type: String, require: true },
  cDate: { type: String, require: true },
  uDate: { type: String, require: true },
});

const review = mongoose.model("review", reviewSchema);

module.exports = review;
