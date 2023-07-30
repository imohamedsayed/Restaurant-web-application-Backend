const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { requireAdmin } = require("../middleware/AuthMiddleware");

/*
    --> GET requests
*/
router.get("/", requireAdmin, OrderController.getAllOrders);
router.get("/stats", requireAdmin, OrderController.orderStats);
router.get("/items/:id", requireAdmin, OrderController.getOrderItems);
router.get("/:id", requireAdmin, OrderController.getOrder);

/*
    --> DELETE requests
*/

router.delete("/:id", requireAdmin, OrderController.deleteOrder);

module.exports = router;
