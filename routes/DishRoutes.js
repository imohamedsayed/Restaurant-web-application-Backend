const DishController = require("../controllers/DishController");
const express = require("express");
const router = express.Router();

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
    --->> POST Requests
*/

router.post("/", requireAdmin, upload.single("image"), DishController.addDish);

/*
    --->> GET Requests
*/
router.get("/", requireAdmin, DishController.dishes);
router.get("/stats", requireAdmin, DishController.dishStats);
router.get("/:id", requireAdmin, DishController.getDish);
router.get("/category/:id", requireAdmin, DishController.getCategoryDishes);

/*
    --->> PUT Requests
*/

router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  DishController.updateDish
);
/*
    --->> DELETE Requests
*/

router.delete("/:id", requireAdmin, DishController.deleteDish);

module.exports = router;
