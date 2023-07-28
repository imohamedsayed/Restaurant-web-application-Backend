const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "user id is required"],
  },
  deliveryInfo: {
    type: Object,
    required: [true, "Customer Credentials are required"],
  },
  total: {
    type: Number,
    required: [true, "total is required"],
  },
  items: {
    type: Array,
    required: [true, "items are required"],
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
