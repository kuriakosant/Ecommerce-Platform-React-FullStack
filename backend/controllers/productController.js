const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

// Fetch all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Fetch single product
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, category, brand, gender } = req.body;

  const product = new Product({
    name,
    description,
    price,
    image,
    category,
    brand,
    gender,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, gender } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.gender = gender;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      await Cart.updateMany(
        { 'items.productId': req.params.id },
        { $pull: { items: { productId: req.params.id } } }
      );
      await Order.updateMany(
        { 'items.productId': req.params.id },
        { $pull: { items: { productId: req.params.id } } }
      );
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
