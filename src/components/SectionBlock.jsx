import React from 'react';
import './SectionBlock.css';

const SectionBlock = ({ title, children, rightLink }) => {
  return (
    <section className="section-block">
      <div className="section-block__header">
        <h2 className="section-block__title">{title}</h2>
        {rightLink && <a href={rightLink.href} className="section-block__link">{rightLink.text}</a>}
      </div>
      <div className="section-block__content">{children}</div>
    </section>
  );
};

export default SectionBlock;
