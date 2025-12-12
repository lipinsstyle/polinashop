import React from 'react';
import './StoreLocations.css';
import mapImg from '../assets/images/map.png';

const StoreLocations = () => (
  <section className="store-locations">
    <div className="store-locations__header">
      <h2 className="store-locations__title">Наши магазины</h2>
      <a href="#" className="store-locations__all">Все магазины</a>
    </div>
    <div className="store-locations__map-block">
      <img src={mapImg} alt="Карта магазинов" className="store-locations__map" />
    </div>
  </section>
);

export default StoreLocations;
