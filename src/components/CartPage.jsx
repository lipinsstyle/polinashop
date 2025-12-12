import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import pancakes from '../assets/images/pancakes.png';
import milk1 from '../assets/images/milk1.png';
import colbasa from '../assets/images/colbasa.png';
import sausages from '../assets/images/sausages.png';
import vetchina from '../assets/images/vetchina.png';
import palka from '../assets/images/palka.png';


const images = {
  'pancakes.png': pancakes,
  'milk1.png': milk1,
  'colbasa.png': colbasa,
  'sausages.png': sausages,
  'vetchina.png': vetchina,
  'palka.png': palka,
};


const MIN_ORDER = 1000;
const AVAILABLE_BONUS = 200;
const BONUS_REDEEM = 200;
const BONUS_NOTE = 100;


// DEMO: Для имитации статусов "С картой"/"Обычная" (попеременно)
function getPriceStatus(idx) {
  return idx % 2 === 1 ? 's-card' : 'simple';
}


const CartPage = () => {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();
  const [redeemBonus, setRedeemBonus] = useState(false);
  // set of selected item titles
  const [selectedItems, setSelectedItems] = useState(cart.map(item => item.title));
  const navigate = useNavigate();


  function isChecked(item) { return selectedItems.includes(item.title) && !notAvailable(item); }


  function handleToggleItem(item) {
    if (notAvailable(item)) return;
    setSelectedItems(prev =>
      prev.includes(item.title)
        ? prev.filter(i => i !== item.title)
        : [...prev, item.title]
    );
  }


  function handleCheckAll() {
    // если все (кроме notAvailable) выбраны — снять все, иначе выбрать все
    const enabledItems = cart.filter(item => !notAvailable(item)).map(item => item.title);
    const allChecked = enabledItems.every(title => selectedItems.includes(title));
    setSelectedItems(allChecked ? [] : enabledItems);
  }
  function handleRemoveSelected() {
    selectedItems.forEach(title => removeFromCart(title));
    setSelectedItems([]);
  }
  function notAvailable(item) { return item.title.toLowerCase().includes('нет в наличии'); }
  
  const selectedCart = cart.filter(item => isChecked(item) && !notAvailable(item));
  const total = selectedCart.reduce((sum, p) => sum + Number(p.price.replace(',', '.')) * p.quantity, 0);
  const oldTotal = selectedCart.reduce((sum, p) => sum + (Number((p.oldPrice||p.price).replace(',', '.')) * p.quantity), 0);
  const discount = oldTotal - total;
  const cartCount = selectedCart.reduce((acc, item) => acc + item.quantity, 0);
  
  const enabledItems = cart.filter(item => !notAvailable(item)).map(item => item.title);
  const allChecked = enabledItems.length>0 && enabledItems.every(title => selectedItems.includes(title));


  return (
    <div className="cart-page-bg">
      <div className="cart-page-layout">
        <section className="cart-prod-list">
          <div className="cart-breadcrumb">
            <span className="cart-breadcrumb-link" onClick={() => navigate('/')}>Главная</span>
            <span className="cart-breadcrumb-divider">/</span>
            <span className="cart-breadcrumb-current">Корзина</span>
          </div>
          <div className="cart-title-row">
            <h1>Корзина</h1>
            {!!cartCount && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
          </div>
          <div className="cart-actions-head">
            <label className="cart-checkall" style={{cursor:enabledItems.length?"pointer":"default",opacity:enabledItems.length?1:.5}}>
              <input
                type="checkbox"
                className="cart-real-checkbox"
                onChange={handleCheckAll}
                checked={allChecked}
                disabled={!enabledItems.length}
              />
              <span className="cart-checkbox-span"></span>
              <span>Выбрать всё</span>
            </label>
            <button className="cart-remove-btn" style={{opacity:selectedItems.length?1:.4}} disabled={!selectedItems.length} onClick={handleRemoveSelected}>Удалить выбранные</button>
          </div>
          <div className="cart-list-section">
            {cart.length === 0 ? <div className="cart-empty">Ваша корзина пуста</div> : 
              cart.map((item, idx) => {
                const imgName = item.image.split('/').pop();
                const imgSrc = images[imgName] || item.image;
                const status = getPriceStatus(idx); // DEMO
                return (
                  <div className={`cart-item-row${notAvailable(item) ? ' not-available' : ''}`} key={idx}>
                    <label className={`cart-checkbox-wrap${isChecked(item) ? ' checked':''}`}
                          style={{cursor:notAvailable(item)?'default':'pointer'}}>
                      <input
                        type="checkbox"
                        className="cart-real-checkbox"
                        checked={isChecked(item)}
                        disabled={notAvailable(item)}
                        onChange={()=>handleToggleItem(item)}
                      />
                      <span className="cart-checkbox-span"></span>
                    </label>
                    <img src={imgSrc} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-content">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">{item.price} ₽</span>
                        {item.oldPrice && <span className="cart-item-oldprice">{item.oldPrice} ₽</span>}
                        {item.discount && <div className="cart-item-discount">{item.discount}</div>}
                      </div>
                      <div className="cart-item-meta">
                        <span className={`cart-item-pricetype ${status}`}>{status === 's-card' ? 'С картой' : 'Обычная'}</span>
                        <span className="cart-item-for">за шт.</span>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => decreaseFromCart(item.title)} className="cart-qty-btn" disabled={item.quantity === 1 || notAvailable(item)}>
                        <svg width="15" height="15" viewBox="0 0 16 16" style={{display:'block',margin:'auto'}}><rect x="3" y="7.05" width="10" height="1.9" rx="0.9" fill={item.quantity === 1 || notAvailable(item)?'#babfc2':'#fff'} /></svg>
                      </button>
                      <span className="cart-qty-count">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="cart-qty-btn" disabled={notAvailable(item)}>
                        <svg width="15" height="15" viewBox="0 0 16 16" style={{display:'block',margin:'auto'}}><rect x="3" y="7.05" width="10" height="1.9" rx="0.9" fill={notAvailable(item)?'#babfc2':'#fff'} /><rect x="7.05" y="3" width="1.9" height="10" rx="0.9" fill={notAvailable(item)?'#babfc2':'#fff'} /></svg>
                      </button>
                    </div>
                    <div className="cart-item-priceblock">
                      <div className="cart-item-total">{(Number(item.price.replace(',', '.')) * item.quantity).toFixed(2)} ₽</div>
                    </div>
                    <button onClick={() => removeFromCart(item.title)} className="cart-item-remove">✕</button>
                    {notAvailable(item) && <div className="cart-item-notsign"><svg width="17" height="16" style={{marginRight:3,marginBottom:-2}}><rect width="17" height="16" rx="6" fill="#ececec"/></svg>Нет в наличии</div>}
                  </div>
                );
              })}
          </div>
        </section>
        <aside className="cart-sidebar">
          <div className="cart-bonuses">
            <label className="cart-switch">
              <input type="checkbox" checked={redeemBonus} onChange={e => setRedeemBonus(e.target.checked)}/>
              <span className="cart-switch-slider"></span>
              <span className="cart-switch-title">Списать {BONUS_REDEEM} ₽</span>
            </label>
            <div className="cart-bonus-hint">На карте накоплено {AVAILABLE_BONUS} ₽</div>
          </div>
          <div className="cart-calcs">
            <div className="cart-sidebar-row">
              <span>{cartCount} {cartCount === 1 ? 'товар' : cartCount < 5 ? 'товара' : 'товаров'}</span>
              <span>{oldTotal.toFixed(2)} ₽</span>
            </div>
            {discount > 0 && <div className="cart-sidebar-row cart-discount"><span>Скидка</span><span style={{color:'#ff6b35'}}>-{discount.toFixed(2)} ₽</span></div>}
          </div>
          <div className="cart-total">
            <div className="cart-total-label">Итого</div>
            <div className="cart-total-value">{(total - (redeemBonus ? BONUS_REDEEM : 0)).toFixed(2)} ₽</div>
            <div className="cart-bonus-earned">
              <svg width="15" height="14" style={{marginRight:2,marginBottom:-2}}><rect width="15" height="14" rx="4" fill="#2db344"/></svg>Вы получаете <b>{BONUS_NOTE}</b> <span>бонусов</span>
            </div>
          </div>
          {total < MIN_ORDER && <div className="cart-need-min-order">Минимальная сумма заказа 1000р</div>}
          <button className="cart-order-btn" disabled={cartCount === 0 || total < MIN_ORDER}>Оформить заказ</button>
        </aside>
      </div>
    </div>
  );
};


export default CartPage;
