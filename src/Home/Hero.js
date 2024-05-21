import React from 'react';
import heroImage from '../img/2.png';
import './Style/Hero.css'; // Importa tu archivo de estilos CSS personalizados

const Hero = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
      <p>Tienda de videojuegos</p>
        <h1>ELECTRO START</h1> 
      </div>
    </section>
  );
};

export default Hero;
