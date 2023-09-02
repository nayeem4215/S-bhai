const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should be the name of the User model
      required: true,
    },
    commentData: { type: String, required: true },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // This should be the name of the Bike model
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
