// src/pages/IniciarSesion/IniciarSesion.js
import React from 'react';
import { Link } from 'react-router-dom';
import imagenes from './imagenes';
import './globals.css';
import './style.css';
import axios from 'axios';
import { useState } from 'react';
import Header from '../../common/header/header';

const VentaFinal = () => {
  const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const handleRemoverJuego = (juegoId) => {
    const juegoExistente = juegosSeleccionados.find(juego => juego.juego_id === juegoId);
    let nuevosJuegosSeleccionados;
    if (juegoExistente.cantidad > 1) {
      nuevosJuegosSeleccionados = juegosSeleccionados.map(juego =>
        juego.juego_id === juegoId ? { ...juego, cantidad: juego.cantidad - 1 } : juego
      );
    } else {
      nuevosJuegosSeleccionados = juegosSeleccionados.filter(juego => juego.juego_id !== juegoId);
      setIsDropdownVisible(nuevosJuegosSeleccionados.length > 0);
    }
    setJuegosSeleccionados(nuevosJuegosSeleccionados);
    actualizarJuegosSeleccionados(nuevosJuegosSeleccionados);
  }
  const actualizarJuegosSeleccionados = (juegosSeleccionados) => {
    axios.post('http://localhost:3001/juegos-seleccionados', juegosSeleccionados)
      .then(response => console.log('Selected games updated successfully:', response))
      .catch(error => console.error('Error updating selected games:', error));
  };
  return (
    <div>
      <Header
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsDropdownVisible}
      />
    <div class="VENTA-FINAL">
      <div class="div">
        <div class="frame">
          <div class="div-wrapper"><p class="text-wrapper">¡TU VIDEOJUEGO SE HA PUESTO EN VENTA!</p></div>
          <div class="frame-2">
            <Link to="/inicio" class="frame-3"><button class="text-wrapper-2">Volver al incio</button></Link>
            <Link to="/detalle-producto-usado" class="frame-4"><button class="text-wrapper-2">Ver publicación</button></Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VentaFinal;
