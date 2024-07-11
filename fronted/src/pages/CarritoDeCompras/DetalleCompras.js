import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import Header from '../../common/header/header.js';
import useCarrito from '../auxiliar.js';
import CarritoCompras from '../CarritoCompras.js';
import imagenes from './imagenes.js';
import axios from 'axios';

const DetalleCompras = () => {
  const {
    juegosSeleccionados,
    isDropdownVisible,
    setIsDropdownVisible,
    handleRemoverJuego,
    handleAgregarJuego,
    mostrarCarrito,
    carritoKey
  } = useCarrito();

  const precioTotal = juegosSeleccionados.reduce((total, juego) => total + juego.precio * juego.cantidad, 0);

  return (
    <div>
      <Header 
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />
      <div className="carrito-de-compras">
        <div className="div">
          <img className="line" src={imagenes.line4} alt="line" />
          <div className="text-wrapper">Tu carrito</div>
          <div className="frame">
            {juegosSeleccionados.map((juego, index) => (
              <div key={index} className="frame-2">
                <img className="rectangle" src={`http://localhost:3001/uploads/${juego.titulo}`} alt={juego.titulo} />
                <div className="frame-3">
                  <div className="frame-4">
                    <div className="frame-5">
                      <div className="text-wrapper-2">{juego.titulo}</div>
                      <div className="frame-6"><div className="text-wrapper-3">Estado: {juego.estado}</div></div>
                    </div>
                    <div className="text-wrapper-4">S/ {juego.precio}</div>
                  </div>
                  <div className="frame-7">
                    <img className="img" src={imagenes.frame3} alt="frame3" />
                    <div className="frame-8">
                      <button className='button-remover' onClick={() => handleRemoverJuego(juego.juego_id)}>
                        <img className="frame-9" src={imagenes.frame4} alt="frame4" />
                      </button> 
                      <div className="text-wrapper-5">{juego.cantidad}</div>
                      <button className='button-remover' onClick={() => handleAgregarJuego(juego.juego_id)}>
                        <img className="frame-9" src={imagenes.frame5} alt="frame5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="frame-10">
            <div className="text-wrapper-6">Resumen</div>
            <div className="frame-11">
              <div className="frame-12">
                <div className="text-wrapper-7">Subtotal</div>
                <div className="text-wrapper-8">S/ {precioTotal}</div>
              </div>
              <div className="frame-12">
                <div className="text-wrapper-7">Descuento (-20%)</div>
                <div className="text-wrapper-9">-S/ {precioTotal * 0.2}</div>
              </div>
              <div className="frame-12">
                <div className="text-wrapper-7">Delivery</div>
                <div className="text-wrapper-8">S/ 20</div>
              </div>
              <img className="line-2" src={imagenes.line61} alt="line61" />
              <div className="frame-12">
                <div className="text-wrapper-10">Total</div>
                <div className="text-wrapper-11">S/ {precioTotal * 0.8 + 20}</div>
              </div>
            </div>
            <div className="frame-13">
              <div className="frame-14">
                <img className="img" src={imagenes.frame9} alt="frame9" />
                <input className="text-wrapper-12" placeholder="Codigo de promocion" />
              </div>
              <div className="div-wrapper"><div className="text-wrapper-13">Aplicar</div></div>
            </div>
            <Link to="/pago-tarjetas">
              <div className="frame-15">
                <div className="text-wrapper-13">Pagar</div>
                <img className="img" src={imagenes.arrowDownBoldL} alt="arrowDownBoldL" />
              </div>
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

export default DetalleCompras;
