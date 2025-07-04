import React from "react";
import { FaFileInvoiceDollar, FaCalendarAlt, FaHandshake, FaBookOpen, FaShoppingCart, FaSearch, FaUsers } from "react-icons/fa";
import "../styles/Tools.css";
import { useNavigate } from "react-router-dom";

const tools = [
  { icon: <FaFileInvoiceDollar className="tool-icon" />, label: "COTIZACIONES EN LÍNEA", path: "/cotizaciones" },
  { icon: <FaCalendarAlt className="tool-icon" />, label: "PLAN ANUAL DE COMPRAS", path: "/plan-anual" },
  { icon: <FaHandshake className="tool-icon" />, label: "OPORTUNIDADES PARA VENDERLE AL ESTADO", path: "/oportunidades" },
  { icon: <FaBookOpen className="tool-icon" />, label: "BIBLIOTECA SISTEMATIZADA DE LA DGCP", path: "/biblioteca" },
  { icon: <FaShoppingCart className="tool-icon" />, label: "CONVENIO MARCO", path: "/convenio-marco" },
  { icon: <FaSearch className="tool-icon" />, label: "BUSCADOR UNSPSC - RUBROS", path: "/buscador-unspsc" },
  { icon: <FaUsers className="tool-icon" />, label: "REGISTRO PROPONENTES", path: "/registro-proponentes" },
];

const Tools = () => {
  const navigate = useNavigate();
  return (
    <section className="tools-section">
      <div className="tools-grid">
        {tools.map((tool, idx) => (
          <button
            className="tool-card"
            key={idx}
            onClick={() => navigate(tool.path)}
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            <div className="tool-icon-bg">
              {tool.icon}
            </div>
            <div className="tool-label">{tool.label}</div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tools; 