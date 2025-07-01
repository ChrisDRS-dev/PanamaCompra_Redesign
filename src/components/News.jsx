import React, { useState, useEffect, useRef } from "react";
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
  const intervalRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [slideDir, setSlideDir] = useState(null); 

  const goTo = (idx) => {
    setSlideDir(idx > current || (current === total - 1 && idx === 0) ? 'right' : 'left');
    setTimeout(() => {
      setCurrent(idx);
      setSlideDir(null);
    }, 10);
  };
  const prev = () => {
    setSlideDir('left');
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
      setSlideDir(null);
    }, 10);
  };
  const next = () => {
    setSlideDir('right');
    setTimeout(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
      setSlideDir(null);
    }, 10);
  };

  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setSlideDir('right');
        setTimeout(() => {
          setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
          setSlideDir(null);
        }, 10);
      }, 3000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, total]);

  // Helper for preview index
  const getPreviewIndex = (offset) => {
    let idx = current + offset;
    if (idx < 0) idx += total;
    if (idx >= total) idx -= total;
    return idx;
  };

  return (
    <section className="news-section">
      <div
        className="news-carousel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Preview left */}
        <div className="news-preview news-preview--left">
          <div className="news-preview-content">
            <div className="news-date">{newsData[getPreviewIndex(-1)].date}</div>
            <div className="news-title">{newsData[getPreviewIndex(-1)].title}</div>
          </div>
        </div>
        {/* Main slide */}
        <div className={`news-slide${hovered ? " hovered" : ""}${slideDir ? ` slide-${slideDir}` : ""}`}>
          <div className="news-date">{newsData[current].date}</div>
          <div className="news-content">
            <a href={newsData[current].link} className="news-title" target="_blank" rel="noopener noreferrer">
              {newsData[current].title}
            </a>
            <p className="news-desc">{newsData[current].description}</p>
            {/* Mostrar más info en hover si se desea */}
            {hovered && (
              <div className="news-more-info">Más información disponible...</div>
            )}
          </div>
        </div>
        {/* Preview right */}
        <div className="news-preview news-preview--right">
          <div className="news-preview-content">
            <div className="news-date">{newsData[getPreviewIndex(1)].date}</div>
            <div className="news-title">{newsData[getPreviewIndex(1)].title}</div>
          </div>
        </div>
        {/* Botones solo en hover */}
        {hovered && (
          <>
            <button className="news-arrow" onClick={prev} aria-label="Anterior">&#8592;</button>
            <button className="news-arrow" onClick={next} aria-label="Siguiente">&#8594;</button>
          </>
        )}
      </div>
      {/* Dots solo en hover */}
      {hovered && (
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
      )}
    </section>
  );
};

export default News; 