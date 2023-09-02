const Post = require("./../models/postModel");
const reusable = require("./reusableController");
const catchAsync = require("./../utils/catchAsync");

// basic controller
exports.getAllPost = reusable.getAll(Post);
exports.getPost = reusable.getOne(Post);
exports.createPost = reusable.createOne(Post);
exports.updatePost = reusable.updateOne(Post);
exports.deletePost = reusable.deleteOne(Post);
