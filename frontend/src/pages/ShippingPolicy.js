import React from 'react';
import homeDeliveryImage from '../assets/shipping-home.png';
import globalDeliveryImage from '../assets/shipping-global.png';
import personalDeliveryImage from '../assets/shipping-detail.png';
import '../styles/ShippingPolicy.css';

const ShippingPolicy = () => {
  return (
    <div className="shipping-container">
      <div className="shipping-content">
        <h1 className="title">Shipping Policy</h1>
        <h2 className="subtitle">Home | Shipping Policy</h2>
        <div className="content-box">
          <p className="description">
            Here at Anton Garments Inc, we aim to provide our customers with fast and reliable shipping. All orders are processed within 2-3 business days.
            You will receive a shipment confirmation email once your order has shipped containing your tracking number(s).
          </p>
        </div>
        <div className="shipping-details">
          <div className="shipping-detail">
            <img src={homeDeliveryImage} alt="Home Delivery" />
            <div className="detail-text-box">
              <p>Shipping rates & delivery estimates: Shipping charges for your order will be calculated and displayed at checkout.</p>
            </div>
          </div>
          <div className="shipping-detail">
            <img src={globalDeliveryImage} alt="Global Delivery" />
            <div className="detail-text-box">
              <p>Return & Refund Policy: Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
            </div>
          </div>
          <div className="shipping-detail">
            <img src={personalDeliveryImage} alt="Personal Delivery" />
            <div className="detail-text-box">
              <p>Contact Us for more info. test test test test test test test test test test test test test test test
                Contact Us for more info. test test test test test test test test test test test test test test test
              </p>
            </div>
          </div>
        </div>
        <a href="/contact" className="contact-button">Contact Us for More Info</a>
      </div>
      <footer>
        © 2024 My E-Shop. All rights reserved.
      </footer>
    </div>
  );
}

export default ShippingPolicy;
