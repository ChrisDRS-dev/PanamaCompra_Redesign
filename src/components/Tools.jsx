import React from "react";
import { FaFileInvoiceDollar, FaCalendarAlt, FaHandshake, FaBookOpen, FaShoppingCart, FaSearch, FaUsers } from "react-icons/fa";
import "../styles/Tools.css";

const tools = [
  { icon: <FaFileInvoiceDollar size={48} />, label: "COTIZACIONES EN LÍNEA" },
  { icon: <FaCalendarAlt size={48} />, label: "PLAN ANUAL DE COMPRAS" },
  { icon: <FaHandshake size={48} />, label: "OPORTUNIDADES PARA VENDERLE AL ESTADO" },
  { icon: <FaBookOpen size={48} />, label: "BIBLIOTECA SISTEMATIZADA DE LA DGCP" },
  { icon: <FaShoppingCart size={48} />, label: "CONVENIO MARCO" },
  { icon: <FaSearch size={48} />, label: "BUSCADOR UNSPSC - RUBROS" },
  { icon: <FaUsers size={48} />, label: "REGISTRO PROPONENTES" },
];

const Tools = () => {
  return (
    <section className="tools-section">
      <div className="tools-grid">
        {tools.map((tool, idx) => (
          <div className="tool-card" key={idx}>
            <div className="tool-icon-bg">
              <span className="tool-icon">{tool.icon}</span>
            </div>
            <div className="tool-label">{tool.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools; 