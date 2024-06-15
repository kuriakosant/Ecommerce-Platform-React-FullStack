const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const createAdminUser = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const adminUser = new User({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: await bcrypt.hash('123456', 10), // Ensure the password is hashed asynchronously
    isAdmin: true,
  });

  await adminUser.save();
  console.log('Admin user created');
  mongoose.connection.close();
};

createAdminUser();
