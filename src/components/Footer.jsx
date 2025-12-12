import React from 'react';
import './Footer.css';
import footerLogo from '../assets/images/footer-logo.png';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__left">
        <img src={footerLogo} alt="Северяночка" className="footer__logo" />
        <div className="footer__copyright">© Северяночка, 2025</div>
      </div>
      <div className="footer__center">
        <div className="footer__links">
          <a href="#" className="footer__link">О компании</a>
          <a href="#" className="footer__link">Контакты</a>
          <a href="#" className="footer__link">Вакансии</a>
        </div>
      </div>
      <div className="footer__right">
        <div className="footer__phone">8 800 777 33 33</div>
        <div className="footer__address">г. Северодвинск, ул. Ленина, 1</div>
      </div>
    </div>
  </footer>
);

export default Footer;
