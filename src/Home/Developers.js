import React from 'react';
import './Style/Developers.css';
import sara from '../img/Sara.jpg';
import cinthia from '../img/Cinthia.jpg';
import esteban from '../img/Esteban.jpg';

const Developers = () => {
  return (
    <section id="developers" className="developers-section">
      <div className="container text-center">
        <h2>Nuestro Equipo</h2>
        <div className="row">
          <div className="col-md-4 developer">
            <img src={sara} alt="Sara" className="developer-img" />
            <p className="title">Sara Morales </p>
            <p className="Rol"> Desarrollador Fullstack</p>
          </div>
          <div className="col-md-4 developer">
            <img src={esteban} alt="Esteban" className="developer-img" />
            <p className="title">Esteban Garcia </p>
            <p className="Rol"> Desarrollador Backend</p>
          </div>
          <div className="col-md-4 developer">
            <img src={cinthia} alt="Cinthia" className="developer-img" />
            <p className="title">Cinthia Serna </p>
            <p className="Rol"> Desarrollador Fullstack</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developers;
