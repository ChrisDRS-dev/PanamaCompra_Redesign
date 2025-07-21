import React from "react";
import logoOficial from "../assets/logo-oficial.png";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "../styles/Navbar.css";

const enlacesInternos = [
  { label: "Inicio", href: "/" },
  { label: "Contáctenos", href: "#" },
  { label: "Nosotros", href: "#" },
  { label: "Términos y Condiciones de Uso", href: "#" },
  { label: "Política de Privacidad", href: "#" },
];

const enlacesExternos = [
  { label: "PanamaCompra en Cifras", href: "#" },
  { label: "Biblioteca Sistematizada de la DGCP", href: "#" },
  { label: "PanamaCompra VI", href: "#" },
  { label: "Dirección General de Contrataciones Públicas", href: "#" },
  { label: "Gaceta Oficial", href: "#" },
  { label: "LEGISPAN", href: "#" },
  { label: "Transparencia", href: "#" },
  { label: "Panamá en Obras", href: "#" },
  { label: "Sistema de Ficha técnicas (MINSA)", href: "#" },
];

const Footer = () => {
  return (
    <footer className="footer" style={{ background: "#1780a1", color: "#fff", padding: "2rem 0 1rem 0", marginTop: "2rem" }}>
      <div className="footer__container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
        <div className="footer__logo" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <img src={logoOficial} alt="PanamaCompra Logo" style={{ height: 70 }} />
        </div>
        <div className="footer__links" style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Enlaces</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {enlacesInternos.map((enlace) => (
                <li key={enlace.label} style={{ marginBottom: 4 }}>
                  <a href={enlace.href} style={{ color: "#fff", textDecoration: "none", fontSize: 15 }}>{enlace.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Enlaces externos</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {enlacesExternos.map((enlace) => (
                <li key={enlace.label} style={{ marginBottom: 4 }}>
                  <a href={enlace.href} style={{ color: "#fff", textDecoration: "none", fontSize: 15 }}>{enlace.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", borderTop: "1px solid #fff3", paddingTop: 12 }}>
          <div style={{ fontSize: 14 }}>
            © 2025 DGCP - Todos los Derechos Reservados.
          </div>
          <div className="footer__social" style={{ display: "flex", gap: 16 }}>
            <a href="#" title="Facebook" style={{ color: "#fff", fontSize: 20 }}><FaFacebookF /></a>
            <a href="#" title="Twitter" style={{ color: "#fff", fontSize: 20 }}><FaTwitter /></a>
            <a href="#" title="YouTube" style={{ color: "#fff", fontSize: 20 }}><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 