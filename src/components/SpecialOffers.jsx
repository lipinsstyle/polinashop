import React from 'react';
import './SpecialOffers.css';
import offerCard from '../assets/images/offer-card.png';
import offerBasket from '../assets/images/offer-basket.png';

const offers = [
  {
    image: offerCard,
    bg: '#fff3e2',
  },
  {
    image: offerBasket,
    bg: '#e8f5e8',
  },
];

const SpecialOffers = () => (
  <section className="special-offers">
    {offers.map((offer, i) => (
      <div className="special-offers__card" style={{ background: offer.bg }} key={i}>
        <img src={offer.image} alt="" className="special-offers__img" />
      </div>
    ))}
  </section>
);

export default SpecialOffers;
