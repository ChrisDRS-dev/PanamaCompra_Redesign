import React, { useState } from "react";
import logoGubernamental from "../assets/logo-gubernamental.png";
import "../styles/Navbar.css";

const proveedoresMenu = [
  [
    "Oportunidades para venderle al Estado",
    "Convenio Marco",
    "Convertidores a PDF",
  ],
  [
    "Registrarse como proveedor del Estado",
    "Tienda Virtual",
  ],
];

const normativaMenu = [
  [
    "Leyes",
    "Resoluciones",
    "Manuales e Instructivos",
    "Documentos Estandarizados - Ley 419",
    "Biblioteca Sistematizada",
  ],
  [
    "Decretos",
    "Circulares y Comunicados",
    "Documentos Estandarizados",
    "Código de Ética en la Contratación Pública",
  ],
];

const capacitacionMenu = [
  [
    "Centro de Capacitación Virtual",
    "¿Conoces la plataforma de Cotización en Línea?",
    "¿Sabías que...?",
  ],
  [
    "Instructivo para Comisionados",
    "Guías de Contratación Pública",
  ],
];

const menuConfig = {
  proveedores: {
    title: "Proveedores",
    columns: proveedoresMenu,
  },
  normativa: {
    title: "Normativa",
    columns: normativaMenu,
  },
  capacitacion: {
    title: "Capacitación",
    columns: capacitacionMenu,
  },
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleCloseMenu = () => setOpenMenu(null);

  const renderDropdown = (key) => {
    const menu = menuConfig[key];
    if (!menu) return null;
    return (
      <div className="navbar__dropdown-menu navbar__dropdown-menu--columns">
        <div className="navbar__dropdown-header">
          <span className="navbar__dropdown-title">{menu.title}</span>
          <button className="navbar__dropdown-close" onClick={handleCloseMenu}>
            &#10006;
          </button>
        </div>
        <div className="navbar__dropdown-columns">
          {menu.columns.map((col, idx) => (
            <ul key={idx}>
              {col.map((item, i) => (
                <li key={i} className="navbar__dropdown-item">
                  <span className="navbar__dropdown-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header>
      {/* Barra superior institucional */}
      <div className="navbar__topbar">
        <div className="navbar__brand">
          <a href="/">
            <img src={logoGubernamental} alt="Logo Gubernamental" className="navbar__logo" />
          </a>
          <div className="navbar__divider" />
          <div className="navbar__text-group">
            <span className="navbar__text--top">GOBIERNO NACIONAL</span>
            <span className="navbar__text--middle">CON PASO FIRME</span>
            <span className="navbar__text--bottom">DIRECCIÓN GENERAL DE CONTRATACIONES PÚBLICAS</span>
          </div>
        </div>
        <div className="navbar__actions">
          <div className="navbar__search-group">
            <input type="text" placeholder="search" className="navbar__search" />
            <span className="navbar__icon-search" title="Buscar">🔍</span>
          </div>
          <button className="navbar__button">
            <span className="navbar__icon-login">⎆</span> Sign in
          </button>
          <button className="navbar__button navbar__button--primary">Register</button>
        </div>
      </div>
      {/* Barra de menú principal */}
      <nav className="navbar__mainbar">
        <a href="#" className="navbar__link navbar__link--active">Inicio</a>
        {Object.keys(menuConfig).map((key) => (
          <div
            key={key}
            className="navbar__dropdown"
            onMouseEnter={() => setOpenMenu(key)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="navbar__link navbar__dropdown-btn">
              {menuConfig[key].title} <span className="navbar__icon-caret">▼</span>
            </button>
            {openMenu === key && renderDropdown(key)}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Navbar; 