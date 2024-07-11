
import React from 'react';
import { Link } from 'react-router-dom';
import './globals.css';
import './style.css';
import imagenes from './imagenes';

const PagoDesplegableCompras = ({ juegosSeleccionados, onRemoverJuego }) => {
  return (
    <div className="pantalla-despegable">
      <div className="div2">
        <div className="overlap2">
          <div className="overlap-group2">
            <div className="text-wrapper2">Carrito de compras</div>
            <div className="frame2">
              <div className="group-wrapper2">
                <div className="group2">
                  <div className="overlap-group-2-2">
                    <img className="shopping-cart2" src={imagenes.shoppingCart} />
                    <div className="text-wrapper-2-2">{juegosSeleccionados.reduce((total, juego) => total + juego.cantidad, 0)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlap-2-2">
            <p className="p2">Tienes {juegosSeleccionados.length} juegos en la lista</p>
            <img className="x-square2" src={imagenes.xSquare} />
          </div>
        </div>
        
        <div className="text-wrapper-3-2">Costo Total</div>
        <div className="text-wrapper-4-2">S/ {juegosSeleccionados.reduce((total, juego) => total + juego.precio * juego.cantidad, 0)}</div>
        <Link to="/carrito-compras" className="div-wrapper-2"><div className="text-wrapper-5-2">Más detalle</div></Link>
        <Link to="/pago-tarjetas" className="frame-2-2"><div className="text-wrapper-5-2">Pagar</div></Link>

        {/* Lista de juegos seleccionados */}
        <div className="frame-3-2">
          {juegosSeleccionados.map(juego => (
            <div key={juego.juego_id} className="frame-4-2">
              <img className="ljcxangrw-x2" src={`http://localhost:3001/uploads/${juego.titulo}`} alt={juego.titulo} />
              <p className="div-2-2">
                <span className="span2">{juego.titulo}<br /></span>
                <span className="text-wrapper-6-2">Unid: {juego.cantidad}<br />S/ {juego.precio * juego.cantidad}</span>
              </p>
              <button onClick={() => onRemoverJuego(juego.juego_id)}>
                <img className="trash2" src={imagenes.trash22} alt="Eliminar" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PagoDesplegableCompras;
