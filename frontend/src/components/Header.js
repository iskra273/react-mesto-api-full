import React from 'react';
import { Route, Link, Switch, useRouteMath, useLocation, NavLink } from 'react-router-dom';
import logo from '../images/logo_white.svg';


function Header({ userEmailHeader, onSignOut }) {
  const location = useLocation();

  return (
    <div className="Header">
      <header className="header">
        <img className="header__logo" src={logo} />
        <div className="header__link">
          <p className="header__auth header__auth_email">
            {location.pathname ==="/" ? userEmailHeader : ""}
          </p>
          <Link to={
            location.pathname ==="/signup"
            ? "/signin"
            : location.pathname ==="/signin"
            ? "/signup"
            : "/signin" 
          }
          className="header__auth header__auth_exit"
          onClick={location.pathname ==="/" ? onSignOut : () => {}}
          >
            {
              location.pathname ==="/signup"
              ? "Войти"
              : location.pathname ==="/signin"
              ? "Регистрация"
              : "Выйти" 
            }
          </Link> 
        </div>
      </header>
    </div>  
    );
}
  
export default Header;