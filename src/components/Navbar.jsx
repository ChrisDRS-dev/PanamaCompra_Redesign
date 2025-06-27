import React from "react";
import logoGubernamental from "../assets/logo-gubernamental.png";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo y texto institucional */}
      <div className="navbar__brand">
        <a href="/">
          <img
            src={logoGubernamental}
            alt="Logo Gubernamental"
            className="navbar__logo"
          />
        </a>
        <div className="navbar__divider" />
      </div>
      {/* Menú de navegación */}
      <div className="navbar__menu">
        <a href="#" className="navbar__link">Inicio</a>
        <a href="#" className="navbar__link">Proveedores</a>
        <a href="#" className="navbar__link">Normativa</a>
        <a href="#" className="navbar__link">Capacitación</a>
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="search"
          className="navbar__search"
        />
        {/* Botones de usuario */}
        <button className="navbar__button">Sign in</button>
        <button className="navbar__button navbar__button--primary">Register</button>
      </div>
    </nav>
  );
};

export default Navbar; 