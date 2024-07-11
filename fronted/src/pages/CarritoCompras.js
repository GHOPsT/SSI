//C:\Users\PROGRESA HUACHIPA\OneDrive\Escritorio\ProyectoUXFinal\ProjectUX\fronted\src\pages\CarritoCompras.js
import React, { useState } from 'react';
import Header from '../common/header/header.js';
import VentaUsados from './VentaUsados/VentaUsados.js';


const CarritoCompras = ({ juegosSeleccionados, handleRemoverJuego, isDropdownVisible, setIsComprasDropdownVisible }) => {
  
  return (
    <div>
      <Header
        juegosSeleccionados={juegosSeleccionados}
        onRemoverJuego={handleRemoverJuego}
        isComprasDropdownVisible={isDropdownVisible}
        setIsComprasDropdownVisible={setIsComprasDropdownVisible}
      />
    </div>
  );
};

export default CarritoCompras;