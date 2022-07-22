import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({onRegister}) {
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
        onRegister(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2 className="login__title">Регистрация</h2>
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
            <button type = "submit" className="login__button">Зарегистрироваться</button>
            <div className="login__text">
                Уже зарегистрированы?
                <Link to="/signin" className="login__link"> Войти</Link>
            </div>         
        </form>
    )
}
    
export default Register;