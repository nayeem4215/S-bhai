const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This should be the name of the User model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    required: true,
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike", // This should be the name of the Bike model
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
