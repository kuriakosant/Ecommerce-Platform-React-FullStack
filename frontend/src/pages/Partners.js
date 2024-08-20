import React from 'react';
import amberFabricsImage from '../assets/amber-fabrics.png';
import futureWearImage from '../assets/future-wear.png';
import johnsonLogisticsImage from '../assets/johnson-logistics.png';
import '../styles/Partners.css';

const Partners = () => {
  return (
    <div className="partners-container">
      <div className="partners-content">
        <h1 className="title">Partners</h1>
        <h2 className="subtitle">Home | Partners</h2>
        <div className="partners-list">
          <div className="partner">
            <div className="partner-text-box">
              <p>Amber Fabrics: Our first partner is a leading supplier of high-quality fabrics. Their commitment to sustainable sourcing and innovation has helped us maintain our standards of excellence.</p>
            </div>
            <img src={amberFabricsImage} alt="Amber Fabrics" />
          </div>
          <div className="partner">
            <div className="partner-text-box">
              <p>FutureWear: Our second partner specializes in state-of-the-art manufacturing processes. They ensure that our garments are produced efficiently and to the highest quality standards.</p>
            </div>
            <img src={futureWearImage} alt="FutureWear" />
          </div>
          <div className="partner">
            <div className="partner-text-box">
              <p>Johnson Logistics Inc: Our third partner is a logistics company that provides fast and reliable shipping solutions. Their extensive network ensures that our products reach customers worldwide in a timely manner.</p>
            </div>
            <img src={johnsonLogisticsImage} alt="Johnson Logistics Inc" />
          </div>
        </div>
        <a href="/contact" className="contact-button">Contact Us for Details</a>
      </div>
      <footer>
        © 2024 My E-Shop. All rights reserved.
      </footer>
    </div>
  );
}

export default Partners;
