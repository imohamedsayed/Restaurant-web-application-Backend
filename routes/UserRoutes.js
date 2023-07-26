const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

const { requireAdmin } = require("../middleware/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

/*
    --->>> GET Requests
*/

router.get("/", requireAdmin, UserController.getUsers);
router.get("/stats", requireAdmin, UserController.usersStats);
router.get("/hire/:id", requireAdmin, UserController.hireAsAdmin);

/*
  --->> Delete
*/
router.delete("/:id", requireAdmin, UserController.deleteAccount);

module.exports = router;
