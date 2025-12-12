import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  // Проверить существующих пользователей
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  const handleLogin = () => {
    if (phone.length < 12) {
      alert('Введите полный номер телефона');
      return;
    }
    const user = existingUsers.find(u => u.phone === phone);
    if (user) {
      onLogin(user);  
      onClose();      
    } else {
      alert('Пользователь не найден. Зарегистрируйтесь сначала.');
    }
  };

  const handleRegister = () => {
    if (phone.length < 12 || !name) {
      alert('Заполните все обязательные поля');
      return;
    }
    
    // Проверка на существующего пользователя
    const existingUser = existingUsers.find(u => u.phone === phone);
    if (existingUser) {
      alert('Пользователь с таким номером уже существует');
      return;
    }

    const newUser = { phone, name, photo };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    onRegister(newUser);
    onClose(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия */}
        <button className="close-btn" onClick={onClose}>
          <div className="close-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Основной контент */}
        <div className="auth-content">
          <h2 className="auth-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>
          
          {/* Поле телефона */}
          <div className="phone-field">
            <label className="phone-label">Телефон</label>
            <div className="phone-input-container">
              <input
                type="tel"
                className="phone-input-full"
                value={phone}
                onChange={(e) => {
                  let value = e.target.value;
                  // Если пользователь стирает всё, оставляем +7
                  if (!value.startsWith('+7')) {
                    value = '+7';
                  }
                  // Разрешаем только цифры после +7
                  const digitsOnly = value.slice(2).replace(/\D/g, '');
                  setPhone('+7' + digitsOnly.slice(0, 10));
                }}
                placeholder="+7"
                maxLength="12"
              />
            </div>
          </div>

          {/* Поля для регистрации */}
          {!isLogin && (
            <>
              <div className="name-field">
                <label className="name-label">Имя</label>
                <input
                  type="text"
                  className="name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                />
              </div>

              <div className="photo-field">
                <label className="photo-label">Фото (необязательно)</label>
                <div className="photo-upload-container">
                  <input
                    type="file"
                    className="photo-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="photo-upload-label">
                    {photo ? (
                      <div className="photo-selected">
                        <span className="photo-icon">✅</span>
                        <span className="photo-text">Файл выбран</span>
                      </div>
                    ) : (
                      <div className="photo-placeholder">
                        <span className="photo-icon">📷</span>
                        <span className="photo-text">Выберите файл</span>
                      </div>
                    )}
                  </label>
                </div>
                {photo && (
                  <div className="photo-preview">
                    <img src={photo} alt="Preview" className="preview-image" />
                    <button 
                      type="button"
                      className="remove-photo-btn"
                      onClick={() => setPhoto(null)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Кнопка входа/регистрации */}
          <button 
            className="auth-login-btn" 
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? 'Вход' : 'Зарегистрироваться'}
          </button>

          {/* Нижние кнопки */}
          <div className="auth-buttons">
            <button 
              className="auth-register-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Регистрация' : 'Уже есть аккаунт? Войти'}
            </button>
            {isLogin && (
              <button 
                className="forgot-btn"
                onClick={() => alert('Функция восстановления пароля в разработке')}
              >
                Забыли пароль?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

