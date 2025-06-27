import React from "react";
import fondoBanner from "../assets/Fondov2.jpg";
import logoOficial from "../assets/logo-oficial.png";
import "../styles/Title.css";

const Title = () => {
  return (
    <section
      className="title-section"
      style={{ backgroundImage: `url(${fondoBanner})` }}
    >
      <img
        src={logoOficial}
        alt="PanamaCompra Logo"
        className="title-section__logo"
      />
      <p className="title-section__desc">
        Compras públicas, simples, eficaces y transparentes.
      </p>
      <div className="title-section__overlay" />
    </section>
  );
};

export default Title; 