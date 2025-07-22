import React, { useState, useEffect } from "react";
import logoGubernamental from "../assets/logo-gubernamental.png";
import "../styles/Navbar.css";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Al montar, intenta cargar usuario de localStorage
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);
  const { theme, toggleTheme } = useTheme();

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
                  <a href="#" className="navbar__dropdown-link">{item}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  };

  // Funciones para login/register
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Bienvenido, " + data.user.nombre);
        setShowLogin(false);
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch {
      alert("Error de red");
    }
  };

  const handleRegister = async ({ nombre, email, password }) => {
    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Usuario registrado correctamente");
        setShowRegister(false);
        setShowLogin(true);
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch {
      alert("Error de red");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
    localStorage.removeItem("user");
  };

  return (
    <header>
      {/* Barra superior institucional */}
      <div className="navbar__topbar">
        <div className="navbar__brand">
          <a href="/">
            <img src={logoGubernamental} alt="Logo Gubernamental" className="navbar__logo" />
          </a>
          <nav className="navbar__mainbar navbar__mainbar--inline">
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
        </div>
        {/* Menú mobile desplegable */}
        {mobileMenuOpen && (
          <div className="navbar__mobile-menu">
            <a href="#" className="navbar__mobile-link">Inicio</a>
            {Object.keys(menuConfig).map((key) => (
              <a href="#" className="navbar__mobile-link" key={key}>{menuConfig[key].title}</a>
            ))}
          </div>
        )}
        <div className="navbar__actions">
          <div className="navbar__search-group">
            {/* Mobile: solo mostrar lupa, al hacer click mostrar input */}
            <input
              type="text"
              placeholder="search"
              className="navbar__search"
              style={{ display: showMobileSearch ? 'block' : '', width: showMobileSearch ? '120px' : '' }}
              onBlur={() => setShowMobileSearch(false)}
            />
            <span
              className="navbar__icon-search"
              title="Buscar"
              onClick={() => setShowMobileSearch((v) => !v)}
              style={{ display: window.innerWidth <= 900 && !showMobileSearch ? 'block' : '' }}
            >🔍</span>
          </div>
          <button
            className="navbar__button navbar__button--user"
            title={user ? user.nombre : "Iniciar sesión"}
            onClick={() => setShowLogin(true)}
          >
            <FaUserCircle className="navbar__icon-user" />
          </button>
          <button
            className="navbar__button navbar__button--theme"
            onClick={toggleTheme}
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            style={{ marginLeft: "1rem", fontSize: "1.3rem", background: "none", border: "none", cursor: "pointer" }}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          {/* Botón hamburguesa solo en mobile, a la derecha del usuario */}
          <button className="navbar__hamburger" onClick={() => setMobileMenuOpen((v) => !v)}>
            <FaBars />
          </button>
        </div>
      </div>
      <Login
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        onShowRegister={() => { setShowLogin(false); setShowRegister(true); }}
        user={user}
        onLogout={handleLogout}
      />
      <Register
        visible={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={handleRegister}
        onShowLogin={() => { setShowRegister(false); setShowLogin(true); }}
      />
    </header>
  );
};

export default Navbar; 