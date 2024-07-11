// src/pages/IniciarSesion/IniciarSesion.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import imagenes from './imagenes'; // Importa el archivo imagenes.js
import axios from 'axios';
import Header from '../../common/header/header';
import useCarrito from '../auxiliar';
import CarritoCompras from '../CarritoCompras';

const VentaFuncionalidadDelCodigo = () => {

  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    handleRemoverJuego,
    mostrarCarrito,
  } = useCarrito();

  return (
    <div>
      <Header 
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />


    <div class="venta-funcionalidad">
      <div class="div">
        <div class="main">
          <p class="text-wrapper">¿Para que sirve el código?</p>
          <div class="TITULO">
            <div class="label">
              <p class="p">
                El código se entrega a las personas que tienen un videojuego en buenas condiciones, y así generar
                confianza y seguridad a sus futuros compradores. Para obtenerlo se debe acercar a nuestras tiendas
                físicas más cercanas. Donde evaluaremos el detalle de su producto.
              </p>
            </div>
          </div>
          <img class="frame" src={imagenes.frame} alt="Frame" />
          <Link to="/venta-codigo" class="div-wrapper"><div class="text-wrapper-2">Volver</div></Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VentaFuncionalidadDelCodigo;

