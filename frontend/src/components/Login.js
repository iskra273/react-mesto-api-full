import React from 'react';
import { useState } from 'react';

function Login({onLogin}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password)
  }
  
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="login__title">Вход</h2>
      <input
      type="email"
      required
      className="login__input"
      placeholder="Email"
      onChange={handleEmailChange}
      />
      <input
      type="password"
      required
      className="login__input"
      placeholder="Пароль"
      onChange={handlePasswordChange}
      />
      <button type = "submit" className="login__button">Войти</button>
      <div className="login__text"></div>                 
    </form>  
  )
}

export default Login;