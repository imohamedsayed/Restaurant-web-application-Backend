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

module.exports = {
  placeOrder,
  getUserOrders,
};
