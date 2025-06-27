import React, { useState } from "react";
import "../styles/News.css";

// Ejemplo de datos de comunicados
const newsData = [
  {
    id: 1,
    title: "Nuevo proceso de licitación disponible",
    description: "Se ha publicado un nuevo proceso de licitación para obras públicas. Consulta los detalles y participa.",
    date: "Jun 10, 2024",
    link: "#",
  },
  {
    id: 2,
    title: "Actualización de normativa",
    description: "La normativa de compras públicas ha sido actualizada. Descarga el PDF oficial para más información.",
    date: "Jun 8, 2024",
    link: "#",
  },
  {
    id: 3,
    title: "Capacitación para proveedores",
    description: "Inscríbete en la próxima capacitación virtual para proveedores del Estado.",
    date: "Jun 5, 2024",
    link: "#",
  },
];

const News = () => {
  const [current, setCurrent] = useState(0);
  const total = newsData.length;

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <section className="news-section">
      <div className="news-carousel">
        <button className="news-arrow" onClick={prev} aria-label="Anterior">&#8592;</button>
        <div className="news-slide">
          <div className="news-date">{newsData[current].date}</div>
          <div className="news-content">
            <a href={newsData[current].link} className="news-title" target="_blank" rel="noopener noreferrer">
              {newsData[current].title}
            </a>
            <p className="news-desc">{newsData[current].description}</p>
          </div>
        </div>
        <button className="news-arrow" onClick={next} aria-label="Siguiente">&#8594;</button>
      </div>
      <div className="news-dots">
        {newsData.map((_, idx) => (
          <button
            key={idx}
            className={`news-dot${idx === current ? " active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Ir al comunicado ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default News; 