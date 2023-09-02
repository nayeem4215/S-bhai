const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController.js");
const { protect, admin } = require("../middlewares/authMiddlewares.js");

router.route("/").get(protect, admin, getUsers);
router.route("/signup").post(registerUser);
router.post("/signin", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
