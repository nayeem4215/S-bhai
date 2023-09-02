const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = req.files;
    let images = {};
    for (const key of Object.keys(files)) {
      let file = files[key];
      const url = await uploadToCloudinary(file, path);
      images[key] = url;
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.uploadVideos = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let videos = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      videos.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.uploadPdfs = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let pdfs = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      pdfs.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(pdfs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body;

  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};

const uploadToCloudinary = async (file, path, resourceType = "auto") => {
  try {
    let { secure_url } = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
        resource_type: resourceType,
      }
    );
    removeTmp(file.tempFilePath);
    return { url: secure_url };
  } catch (error) {
    console.log("in cloudinary upload", error);
    removeTmp(file.tempFilePath);
    return res.status(400).json({ message: "Upload image failed." });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
