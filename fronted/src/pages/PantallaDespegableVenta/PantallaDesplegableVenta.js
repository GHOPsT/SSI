// src/pages/IniciarSesion/IniciarSesion.js
import React from 'react';
import { Link } from 'react-router-dom';
import imagenes from './imagenes'; // Importar el archivo imagenes.js
import './globals.css';
import './style.css';

const PantallaDesplegableVenta = () => {
  return (
    <div class="pantalla-despegable">
      <div class="div">
        <div class="overlap-group">
          <div class="text-wrapper">Ventas</div>
          <div class="overlap">
            <div class="text-wrapper-2">Estas vendiendo 2 juegos</div>
            <img class="x-square" src={imagenes.xSquare} /> {/* Reemplazar la imagen */}
          </div>
          <img class="vector" src={imagenes.vector} /> {/* Reemplazar la imagen */}
        </div>
        <img class="line" src={imagenes.line13} /> {/* Reemplazar la imagen */}
        <div class="text-wrapper-3">Posible ingreso</div>
        <div class="text-wrapper-4">S/ 200</div>
        <div class="frame"><div class="text-wrapper-5">Vender más</div></div>
        <div class="frame-2">
          <div class="frame-3">
            <img class="ljcxangrw-x" src={imagenes.Ijc5xangrw540x1} /> {/* Reemplazar la imagen */}
            <p class="p">
              <span class="span">Sackboy: Una gran aventura<br /></span>
              <span class="text-wrapper-6">Unid: 1<br />S/ 100</span>
            </p>
            <img class="trash" src={imagenes.trash21} /> {/* Reemplazar la imagen */}
          </div>
          <img class="img" src={imagenes.line17} /> {/* Reemplazar la imagen */}
          <div class="frame-3">
            <img class="ljcxangrw-x" src={imagenes.Ijc5xangrw540x11} /> {/* Reemplazar la imagen */}
            <p class="p">
              <span class="span">The Last of Us 2<br /></span> <span class="text-wrapper-6">Unid: 1<br />S/ 100</span>
            </p>
            <img class="trash" src={imagenes.trash21} /> {/* Reemplazar la imagen */}
          </div>
          <img class="img" src={imagenes.line17} /> {/* Reemplazar la imagen */}
        </div>
      </div>
    </div>
  );
};

export default PantallaDesplegableVenta;
