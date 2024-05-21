import React from 'react';
import './Style/About.css'
import loguito from '../img/Loguito.png';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h2>Alcance</h2>
            <p> Nuestra tienda virtual ofrece una amplia gama de videojuegos para todas las plataformas, además de accesorios y consolas de última generación.</p>
            <span className="col-md-2">Contácto
            <div className="col-md-3"></div>
              <p>Teléfono: 3127803113</p>
            </span>
          </div>
          <div className="col-md-4">
          <img src={loguito} alt="Logo" className="about-image" />
          </div>
          <div className="col-md-4">
            <h2>Propósito</h2>
            <p>Brindar a nuestros clientes la mejor experiencia en la compra de videojuegos y accesorios, con un servicio al cliente excepcional.</p>
            <a href="https://www.google.com/maps/place/Cl.+46+%2351A+26-318,+Medell%C3%ADn,+Antioquia,+Colombia/@6.2467819,-75.5726603,17z"><button href="" className="btn-map">Tienda fisica</button></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
