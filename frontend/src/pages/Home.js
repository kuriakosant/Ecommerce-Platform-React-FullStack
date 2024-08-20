import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="home-box">
          <h1 className="title">Welcome to Anton Garments, trendy fashion awaits.</h1>
          <p className="description">Check out our Products!</p>
          <button className="shop-button" onClick={goToShop}>SHOP NOW</button>
        </div>
      </div>
      <div className="home-stats">
        <div className="stat-box">
          <div className="stat">
            <h2>10+</h2>
            <p>Years On The Market</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat">
            <h2>$10m</h2>
            <p>Annual Revenue Growth</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat">
            <h2>100+</h2>
            <p>Global Partners</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat">
            <h2>10000+</h2>
            <p>Daily Website Visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
