const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// Fetch orders for the logged-in user
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.productId');
  res.json(orders);
});

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { items, deliveryInfo, total } = req.body;

  const newOrder = new Order({
    user: req.user._id,
    items,
    deliveryInfo,
    total,
  });
  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// Delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (order.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await order.deleteOne();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
};
