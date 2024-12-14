import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.jpg';
import iniciarSesionIcon from '../assets/iniciarsesion.png';
import carritoIcon from '../assets/carrito.png';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <div id="top-bar">
        <p>¡Envíos gratis en compras mayores $50.000,00!</p>
      </div>
      <div id="header-container">
        <div id="logo">
          <h1>
            <img src={logo} alt="Logo" />
          </h1>
        </div>
        <div id="search-bar">
          <form action="#">
            <input type="text" placeholder="Buscar productos..." />
            <input type="submit" value="Buscar" />
          </form>
        </div>
        <div id="cart-icons">
          <Link to="#">
            <img
              src={iniciarSesionIcon}
              alt="Iniciar Sesión"
              style={{
                width: '30px',
                height: '30px',
                verticalAlign: 'middle',
                marginRight: '8px',
              }}
            />
          </Link>
          <Link to="#">
            <img
              src={carritoIcon}
              alt="Carrito de compra"
              style={{
                width: '30px',
                height: '30px',
                verticalAlign: 'middle',
                marginRight: '8px',
              }}
            />
          </Link>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/alta">Alta</Link>
          </li>
          <li>
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/carrito">Carrito</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
