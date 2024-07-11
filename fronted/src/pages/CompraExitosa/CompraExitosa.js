// src/pages/IniciarSesion/IniciarSesion.js
import React from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import RectangleGif from './img/rectangle.gif';
import ThumbsUpRegular from './img/thumbs-up-regular-1.svg';

const CompraExitosa = () => {
  return (
    <div className="compra-exitosa">
      <div className="order-confirmation-wrapper">
        <div className="order-confirmation">
          <div className="overlap-group">
            <img className="rectangle" src={RectangleGif} alt="Rectangle" />
            <p className="text-wrapper">Gracias por confiar en Game Cycle</p>
            <div className="div">Compra #123RGR231567Y exitosa</div>
            <img className="thumbs-up-regular" src={ThumbsUpRegular} alt="Thumbs Up" />
          </div>
          <div className="generate-receipt"><div className="text-wrapper-2">Generar recibo</div></div>
          <Link to="/inicio" className="track-order"><button className="track-order-2">Ir al inicio</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;
