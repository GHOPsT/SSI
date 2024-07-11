// src/pages/IniciarSesion/IniciarSesion.jsimport React from 'react';
import { Link } from 'react-router-dom';
import imagenes from './imagenes'; // Importar el archivo imagenes.js
import './globals.css';
import './style.css';
import axios from 'axios';
import { useState } from 'react';
import Header from '../../common/header/header.js';
import useCarrito from '../auxiliar.js';
import CarritoCompras from '../CarritoCompras.js';


const VentaCodigo = () => {
  
  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    handleRemoverJuego,
    mostrarCarrito,
    carritoKey
  } = useCarrito();


  return (
    <div>
      <Header 
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />
      <div class="venta-cdigo">
        <div class="div">          
          <div class="main">
            <div class="text-wrapper">¡Vende el videojuego!</div>
            <img class="shopify" src={imagenes.shopify1} /> {/* Usar la imagen desde imagenes.js */}
            <div class="TITULO">
              <div class="label"><div class="label-2" >Código </div></div>
              <input class="container" placeholder="Ingrese codigo"/>
            </div>
            <Link to="/venta-datos" class="frame"><button class="text-wrapper-2">Ingresar</button></Link>
            <Link to="/venta-funcionalidad" >
            <img class="para-qu-sirve-el" src={imagenes.paraQueSirveElCodigo} /> {/* Usar la imagen desde imagenes.js */}
            </Link>
          </div>   
        </div>
      </div>
      {mostrarCarrito && (
          <CarritoCompras
            key={carritoKey}
            juegosSeleccionados={juegosSeleccionados}
            handleRemoverJuego={handleRemoverJuego}
            isDropdownVisible={isDropdownVisible}
            setIsComprasDropdownVisible={setIsDropdownVisible}
          />
        )}
     </div>
  );
};

export default VentaCodigo;
