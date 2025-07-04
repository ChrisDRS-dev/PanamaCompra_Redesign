import React, { useState } from "react";
import "../styles/Versions.css";
import Login from "./Login";

const Versions = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Dummy login handler (puedes reemplazarlo por el real si lo necesitas)
  const handleLogin = () => {
    setShowLogin(false);
  };

  return (
    <section className="versions-section">
      {/* V2 */}
      <div className="versions-card">
        <h2 className="versions-title">Panama Compra V2</h2>
        <p className="versions-desc">
          En esta versión, podrá realizar los procesos aplicables para Licitación Por Mejor Valor, Licitación para Convenio Marco, Tienda Virtual, Subasta de bienes Públicos, Procedimiento Especial de Adquisiciones de Emergencia, así como finalizar con los trámites de contratación que inició en esta versión.
        </p>
        <button className="versions-btn" onClick={() => setShowLogin(true)}>
          Iniciar sesion
        </button>
      </div>
      {/* V3 */}
      <div className="versions-card">
        <h2 className="versions-title">Panama Compra V3</h2>
        <p className="versions-desc">
          Nueva versión transaccional, transparente y con novedosas funcionalidades, donde, podrá realizar los procesos aplicables para Cotización en Línea, registro de compra menor (hasta B/.10,000.00), Actos Públicos de Contratación Menor (B/.10,000.00-B/.50,000.00), Licitación Pública, Procedimientos Excepcionales y Especiales de Contratación.
        </p>
        <button className="versions-btn" onClick={() => setShowLogin(true)}>
          Acceder al portal
        </button>
      </div>
      <Login
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        onShowRegister={() => { setShowLogin(false); }} // Puedes mejorar esto si quieres mostrar Register
      />
    </section>
  );
};

export default Versions; 