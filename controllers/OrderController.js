const Dish = require("../models/Dish");
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { userId, receiver, total, items } = req.body;

    const order = await Order.create({
      userId,
      deliveryInfo: receiver,
      total,
      items,
    });

    res
      .status(201)
      .json({ received: req.body, message: "Order created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "We cannot proceed with the order now, try again later",
    });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};
const getUserOrders = async (req, res) => {
  const id = res.locals.userId;
  try {
    const orders = await Order.find({ userId: id });

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);

    res.status(200).json({ order, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};

const getOrderItems = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    const { items } = order;

    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};

const orderStats = async (req, res) => {
  try {
    const orders = await Order.find();

    const revenue = orders.reduce((sum, { total }) => total + sum, 0);

    res.status(200).json({
      orders: orders.length,
      revenue: revenue || 0,
    });
  } catch (err) {
    res.status(500).json({
      errors: err,
      message: "Something went wrong. Please try again later",
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  getOrderItems,
  deleteOrder,
  getOrder,
  orderStats,
};
