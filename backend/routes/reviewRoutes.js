const express = require("express");
const router = express.Router();
const {
  getAllReview,
  getReviewsByBikeId,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middlewares/authMiddlewares.js");

router.route("/").get(getAllReview).post(protect, createReview);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);
router.route("/:bikeId").get(getReviewsByBikeId);
module.exports = router;
