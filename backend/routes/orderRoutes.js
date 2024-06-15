const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getOrders, createOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route('/:id')
  .delete(protect, deleteOrder);

module.exports = router;
