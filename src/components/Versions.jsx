import React from "react";
import "../styles/Versions.css";

const Versions = () => {
  return (
    <section className="versions-section">
      {/* V2 */}
      <div className="versions-card">
        <h2 className="versions-title">Panama Compra V2</h2>
        <p className="versions-desc">
          En esta versión, podrá realizar los procesos aplicables para Licitación Por Mejor Valor, Licitación para Convenio Marco, Tienda Virtual, Subasta de bienes Públicos, Procedimiento Especial de Adquisiciones de Emergencia, así como finalizar con los trámites de contratación que inició en esta versión.
        </p>
        <button className="versions-btn">
          Iniciar sesion
        </button>
      </div>
      {/* V3 */}
      <div className="versions-card">
        <h2 className="versions-title">Panama Compra V3</h2>
        <p className="versions-desc">
          Nueva versión transaccional, transparente y con novedosas funcionalidades, donde, podrá realizar los procesos aplicables para Cotización en Línea, registro de compra menor (hasta B/.10,000.00), Actos Públicos de Contratación Menor (B/.10,000.00-B/.50,000.00), Licitación Pública, Procedimientos Excepcionales y Especiales de Contratación.
        </p>
        <button className="versions-btn">
          Acceder al portal
        </button>
      </div>
    </section>
  );
};

export default Versions; 