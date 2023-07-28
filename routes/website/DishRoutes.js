const DishController = require("../../controllers/DishController");
const express = require("express");
const router = express.Router();

router.post("/cartItems", DishController.getCartItems);

router.get("/", DishController.dishes);
router.get("/:id", DishController.getDish);

router.get("/category/:id", DishController.getCategoryDishes);

module.exports = router;
