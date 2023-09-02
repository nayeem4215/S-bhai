const express = require("express");
const {
  uploadImages,
  uploadVideos,
  uploadPdfs,
} = require("../controllers/uploadController");
// const { protect } = require("../middlewares/authMiddlewares");
const {
  checkImages,
  checkVideos,
  checkPdfs,
} = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/uploadImages", checkImages, uploadImages);
router.post("/uploadVideos", checkVideos, uploadVideos);
router.post("/uploadPdfs", checkPdfs, uploadPdfs);
// router.post("/listImages", authUser, listImages);

module.exports = router;
