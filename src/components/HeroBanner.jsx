import React from 'react';
import heroGroceries from '../assets/images/hero-groceries.png';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <img src={heroGroceries} alt="groceries" className="hero-banner__img" />
    </section>
  );
};

export default HeroBanner;
