const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/OrderController");
const { requireCustomer } = require("../../middleware/AuthMiddleware");
router.post("/", requireCustomer, OrderController.placeOrder);
router.get("/", requireCustomer, OrderController.getUserOrders);

module.exports = router;
