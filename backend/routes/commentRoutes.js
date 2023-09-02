const express = require("express");
const router = express.Router();
const {
  getAllComment,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddlewares.js");

router.route("/").get(getAllComment).post(protect, createComment);
router.route("/:id").put(protect, updateComment).delete(protect, deleteComment);
router.route("/:postId").get(getCommentsByPostId);
module.exports = router;
