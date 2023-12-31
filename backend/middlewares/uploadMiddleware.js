const fs = require("fs");
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.checkPdfs = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "application/pdf" &&
        file.mimetype !== "application/x-pdf"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.checkImages = async function (req, res, next) {
  console.log("in checking");
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large." });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.checkVideos = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (file.mimetype !== "video/mp4") {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "please upload mp4 file!." });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
