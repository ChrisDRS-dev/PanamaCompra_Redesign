import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cotizacion from "./pages/Cotizacion";

const DummyPage = ({ title }) => (
  <div style={{ padding: 40, textAlign: 'center' }}>
    <h2>{title}</h2>
    <p>Página en construcción...</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cotizaciones" element={<Cotizacion />} />
      <Route path="/plan-anual" element={<DummyPage title="Plan Anual de Compras" />} />
      <Route path="/oportunidades" element={<DummyPage title="Oportunidades para Venderle al Estado" />} />
      <Route path="/biblioteca" element={<DummyPage title="Biblioteca Sistematizada de la DGCP" />} />
      <Route path="/convenio-marco" element={<DummyPage title="Convenio Marco" />} />
      <Route path="/buscador-unspsc" element={<DummyPage title="Buscador UNSPSC - Rubros" />} />
      <Route path="/registro-proponentes" element={<DummyPage title="Registro Proponentes" />} />
    </Routes>
  );
} 