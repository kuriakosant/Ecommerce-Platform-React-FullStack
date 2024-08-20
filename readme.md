# My E-Shop - Thesis Project

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Guide](#installation-guide)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage Instructions](#usage-instructions)
- [Admin Access](#admin-access)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Introduction

My E-Shop is a full-stack web application developed as part of my thesis project. The application provides a seamless online shopping experience where users can browse a wide range of clothing items, add products to their cart, and complete purchases. Administrators have the ability to manage products, user accounts, and monitor orders through an integrated admin dashboard.

This project is designed to demonstrate a comprehensive understanding of modern web development technologies, including frontend frameworks, backend servers, database management, and secure user authentication.

## Features
- **User Registration and Authentication**: Users can sign up, log in, and maintain session security using JWT (JSON Web Tokens).
- **Product Browsing**: Browse products categorized by type, brand, and gender.
- **Shopping Cart**: Users can add products to their cart, update quantities, and proceed to checkout.
- **Order Management**: Once products are added to the cart, users can place orders and receive confirmation.
- **Admin Dashboard**: Admin users can manage the product inventory, update product details, and oversee user accounts.
- **Responsive Design**: The application is designed to work on all devices, including desktops, tablets, and smartphones.

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client used for making API requests.
- **React Router**: A library for routing in React applications.
- **CSS**: Custom CSS for styling and ensuring a responsive design.

### Backend
- **Node.js**: A JavaScript runtime environment used to build the backend server.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database used to store product and user data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Used for secure user authentication.

### Additional Tools
- **Postman**: For testing API endpoints during development.
- **MongoDB Compass**: For managing the MongoDB database.

## Installation Guide

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- **Node.js (v14 or higher)**: Ensure Node.js is installed on your system.
- **MongoDB**: Install MongoDB locally or have access to a MongoDB cloud instance.

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone 
   cd ../backend


2. **Install backend dependencies:**
   ```bash
   npm install

3. **Configure environment variables::**
   Create a .env file in the backend directory with the following content:
   ```env
      NODE_ENV=development
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret


4. **Start the backend server:**
   ```bash
   node server.js

The server will start on http://localhost:5000.


### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend


2. **Install frontend dependencies:**
   ```bash
   npm install

3. **Configure environment variables::**
   Create a .env file in the frontend directory with the following content::
   ```env
      REACT_APP_API_URL=http://localhost:5000/api


4. **Start the frontend development server:**
   ```bash
   npm start

The application will be accessible at http://localhost:3000.



## Usage Instructions

- **Access the application:** Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
- **Register or Log in:** Create a new user account or log in with an existing account.
- **Browse Products:** Navigate through different categories, select products, and add them to your cart.
- **Place an Order:** Proceed to checkout from your cart and place an order.
- **Admin Dashboard:** Admin users can access the dashboard to manage products and users.

## Admin Access

To access the admin dashboard, log in using the following credentials:

- **Email:** `admin@gmail.com`
- **Password:** `123456`

> **Note:** You can modify these credentials directly in the database.

## Project Structure

- **backend/:** Contains the backend server code, API routes, and database models.
- **frontend/:** Contains the frontend React application, components, and styles.
- **scripts/:** Contains utility scripts for tasks like database seeding.
- **config/:** Configuration files and environment settings.

## Contributing

Contributions to this project are welcome. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request. Make sure to follow the project's code of conduct.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information

For any inquiries, please contact:

- **Name:** [Kyriakos Antoniadis]
- **Email:** [ kuriakosant2003@gmail.com ]
- **LinkedIn:** [https://www.linkedin.com/in/kyriakos-antoniadis-778652310/]

---

Thank you for taking the time to review my thesis project. Your feedback and suggestions are highly appreciated!

