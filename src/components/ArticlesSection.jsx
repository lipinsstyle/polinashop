import React from 'react';
import './ArticlesSection.css';
import article1 from '../assets/images/article1.png';
import article2 from '../assets/images/article2.png';
import article3 from '../assets/images/article3.png';

const articles = [
  {
    image: article1,
    date: '05.03.2021',
    title: 'Режим использования масок и перчаток',
    description: 'Подробная информация о режимах использования масок и перчаток на территории магазинов. Информация обновляется каждый день.',
    btn: 'Подробнее',
  },
  {
    image: article2,
    date: '08.03.2021',
    title: 'Весеннее настроение для каждой',
    description: '8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.',
    btn: 'Подробнее',
  },
  {
    image: article3,
    date: '22.02.2020',
    title: 'ЗОЖ или ФАСТФУД. А вы на чьей стороне?',
    description: 'Голосуйте за любимые категории, выбирайте категорию-победителя и получайте кешбэк 10% баллами в апреле!',
    btn: 'Подробнее',
  },
];

const ArticlesSection = () => (
  <section className="articles-section">
    <div className="articles-section__header">
      <h2 className="articles-section__title">Статьи</h2>
      <a href="#" className="articles-section__all">Все статьи</a>
    </div>
    <div className="articles-section__list">
      {articles.map((a, i) => (
        <div className="articles-section__card" key={i}>
          <img src={a.image} alt={a.title} className="articles-section__img" />
          <div className="articles-section__date">{a.date}</div>
          <div className="articles-section__card-title">{a.title}</div>
          <div className="articles-section__desc">{a.description}</div>
          <button className="articles-section__btn">{a.btn}</button>
        </div>
      ))}
    </div>
  </section>
);

export default ArticlesSection;
