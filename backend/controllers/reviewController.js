const Review = require("./../models/reviewModel");
const reusable = require("./reusableController");
const catchAsync = require("./../utils/catchAsync");

// basic controller
exports.getAllReview = reusable.getAll(Review);
exports.getReview = reusable.getOne(Review);
exports.createReview = reusable.createOne(Review);
exports.updateReview = reusable.updateOne(Review);
exports.deleteReview = reusable.deleteOne(Review);

// @desc    get reviews of individual course
// @route   PUT /api/reviews/:courseid
// @access  Public
exports.getReviewsByBikeId = catchAsync((req, res) => {
  let reviews = Review.find({ bike: req.params.bikeId });
  res.json({ reviews });
});
