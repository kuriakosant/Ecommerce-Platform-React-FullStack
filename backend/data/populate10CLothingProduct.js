// scripts/populate10ClothingProduct.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const generateRandomProductData = (id) => {
  const names = ['Black Shoes', 'White Shoes', 'Red Shoes', 'Green Shoes', 'Brown Shoes'];
  const brands = ['Brand1', 'Brand2'];
  const genders = ['male', 'female'];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    description: `Description for product ${id + 1}`,
    price: (Math.random() * 100).toFixed(2),
    image: 'https://i.postimg.cc/3JbzntZc/Screenshot-from-2024-07-05-07-43-43.png',
    category: 'clothing',
    brand: brands[Math.floor(Math.random() * brands.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
  };
};

const importData = async () => {
  try {
    await Product.deleteMany();

    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push(generateRandomProductData(i));
    }

    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

connectDB().then(importData);
