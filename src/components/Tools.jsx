import React from "react";
import { FaFileInvoiceDollar, FaCalendarAlt, FaHandshake, FaBookOpen, FaShoppingCart, FaSearch, FaUsers } from "react-icons/fa";
import "../styles/Tools.css";

const tools = [
  { icon: <FaFileInvoiceDollar className="tool-icon" />, label: "COTIZACIONES EN LÍNEA" },
  { icon: <FaCalendarAlt className="tool-icon" />, label: "PLAN ANUAL DE COMPRAS" },
  { icon: <FaHandshake className="tool-icon" />, label: "OPORTUNIDADES PARA VENDERLE AL ESTADO" },
  { icon: <FaBookOpen className="tool-icon" />, label: "BIBLIOTECA SISTEMATIZADA DE LA DGCP" },
  { icon: <FaShoppingCart className="tool-icon" />, label: "CONVENIO MARCO" },
  { icon: <FaSearch className="tool-icon" />, label: "BUSCADOR UNSPSC - RUBROS" },
  { icon: <FaUsers className="tool-icon" />, label: "REGISTRO PROPONENTES" },
];

const Tools = () => {
  return (
    <section className="tools-section">
      <div className="tools-grid">
        {tools.map((tool, idx) => (
          <div className="tool-card" key={idx}>
            <div className="tool-icon-bg">
              {tool.icon}
            </div>
            <div className="tool-label">{tool.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools; 