import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-background">
        <h1 className="title">About Us</h1>
        <h2 className="subtitle">Home | About</h2>
        <p className="description">
          Anton Garments Inc Your destination for online cloth shopping!
        </p>
        <a href="/contact" className="contact-button">Contact Us</a>
      </div>
    </div>
  );
}

export default About;
