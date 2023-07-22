const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { requireAdmin } = require("../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, new Date().toISOString().replace(/:/g, "-") + ext);
  },
});

const upload = multer({ storage });

/*
    --> POST requests
*/
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  CategoryController.addCategory
);

/*
    --> GET requests
*/
router.get("/", CategoryController.getAllCategories);

module.exports = router;
