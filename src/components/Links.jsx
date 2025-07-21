import React from "react";

const accesosDirectos = [
  "Licitación para el Proyecto Teleférico de Panamá y San Miguelito",
  "Precalificaciones",
  "Rendición de Cuentas",
  "Otras Contrataciones",
  "Procedimiento Especial para Municipios, Juntas Comunales y Consejos Provinciales",
  "Reportes de Constancia de las Convocatorias",
  "Asociaciones Público-Privadas - Ley No. 93",
  "Compra Fuera por Catálogo",
  "Solicitud de Información (SDI)",
];

const notificaciones = [
  "Consolidado de Actos Públicos Vigentes",
  "Informe del Estado de Emergencia Ambiental",
  "Informe de Rendición de Cuentas COVID-19",
  "Registro de Contratistas Inhabilitados",
  "Registro de Contratistas Multados",
  "Advertencias y Sanciones al Servidor Público",
  "Acciones Nominativas",
  "Acciones Nominativas V3",
  "Notificaciones Administrativas",
];

const bulletStyle = {
  display: "inline-block",
  width: 10,
  height: 10,
  background: "#1780a1",
  marginRight: 12,
  borderRadius: 2,
  verticalAlign: "middle",
};

const Links = () => (
  <section style={{ background: "#f8f9fa", padding: "48px 0" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ flex: 1, minWidth: 320 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Accesos Directos</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {accesosDirectos.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 18, fontSize: 20, color: "#222" }}>
              <span style={bulletStyle}></span>{item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, minWidth: 320 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Notificaciones Administrativas</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {notificaciones.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 18, fontSize: 20, color: "#222" }}>
              <span style={bulletStyle}></span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Links; 