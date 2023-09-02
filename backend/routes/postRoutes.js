const express = require("express");
const router = express.Router();
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddlewares.js");

router.route("/").get(getAllPost).post(protect, createPost);
router
  .route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost)
  .get(getPost);
module.exports = router;
