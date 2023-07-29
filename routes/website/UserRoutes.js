const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");

const { requireCustomer } = require("../../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

/*
    --->> PATCH Requests
*/
router.patch("/changeName", requireCustomer, UserController.changeName);
router.patch("/changeEmail", requireCustomer, UserController.changeEmail);
router.patch("/changePassword", requireCustomer, UserController.changePassword);
router.patch(
  "/changePicture",
  upload.single("image"),
  requireCustomer,
  UserController.changePicture
);

module.exports = router;
