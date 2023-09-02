const Comment = require("./../models/commentModel");
const reusable = require("./reusableController");
const catchAsync = require("./../utils/catchAsync");

// basic controller
exports.getAllComment = reusable.getAll(Comment);
exports.getComment = reusable.getOne(Comment);
exports.createComment = reusable.createOne(Comment);
exports.updateComment = reusable.updateOne(Comment);
exports.deleteComment = reusable.deleteOne(Comment);

// @desc    get Comments of individual course
// @route   PUT /api/Comments/:courseid
// @access  Public
exports.getCommentsByPostId = catchAsync(async (req, res) => {
  let comments = await Comment.find({ post: req.params.postId });
  res.json({ comments });
});
