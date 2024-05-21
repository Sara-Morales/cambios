import React from "react";
import "./Style/Services.css";
import reversa from "../img/reversa.png";

const Services = () => {
  return (
    <section id="services" className="services text-center py-5">
    <h2 className="text-white mb-4">Servicios</h2>
    <div className="container">     
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h3>Accesorios</h3>
              <img src={reversa} alt="Accesorios" />
            </div>
            <div className="card-back">
              <p>Encuentra una variedad de accesorios para mejorar tu experiencia de juego.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h3>Consolas</h3>
              <img src={reversa} alt="Consolas" />
            </div>
            <div className="card-back">
              <p>Las últimas consolas de juego disponibles a precios increíbles.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h3>Videojuegos</h3>
              <img src={reversa} alt="Videojuegos" />
            </div>
            <div className="card-back">
              <p>Explora nuestra amplia selección de videojuegos de todos los géneros.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
