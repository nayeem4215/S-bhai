const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should be the name of the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    shortDesc: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
